const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const Config = require("./config");
const TriggerEventsFnMap = require("./triggerEventsFnMap");

const app = new Koa();
const router = new Router();
const PORT = Config.port;
const TOKEN = Config.token;

app.use(bodyParser());

const success = (opt = {}) => ({ code: 0, ...opt });
const error = (err = "", opt = {}) => ({ code: -1, error: err, ...opt });

// 检查 gitlab token
const verifyToke = (ctx, next) => {
  const headerToken = ctx?.request?.header?.["x-gitlab-token"];
  if (TOKEN && headerToken !== TOKEN) {
    ctx.throw(401, error("Unauthorized"));
  } else {
    next();
  }
};

router.get("/", (ctx, next) => {
  ctx.body = success({ message: "success!" });
});

// 触发来源
router.post("/git/trigger", verifyToke, (ctx, next) => {
  const trigger = ctx?.request?.header?.["x-gitlab-event"];
  const data = ctx.request?.body || {};

  // 推送事件
  const triggerFn = TriggerEventsFnMap[trigger];
  if (triggerFn) {
    try {
      setTimeout(() => {
        triggerFn(data);
      });
    } catch (error) {
      console.error(error);
    }
    ctx.body = success();
  } else {
    ctx.body = error("没有此类触发");
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`start server with ${PORT}`);
});

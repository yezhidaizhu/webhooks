const { onPushEvent, onTagPushEvent } = require("./script");
const { TriggerEvents } = require("./type");

/**
 * 触发类型以及相对应的脚本执行方法
 */
const TriggerEventsFnMap = {
  // [TriggerEvents.Push]: onPushEvent,
  [TriggerEvents.TagPush]: onTagPushEvent,
};

module.exports = TriggerEventsFnMap;

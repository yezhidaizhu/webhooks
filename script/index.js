const { workTree } = require("../config");
const { exec, which, cd } = require("./common");

/**
 * 当有代码推送的时候，拉取最新代码
 * @returns
 */
async function onPushEvent() {
  if (!which("git")) {
    console.error("Sorry, this script requires git");
    return;
  }

  try {
    cd(workTree);
    exec(`git switch master`);
    exec(`git pull`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * 当有有标签推送的时候
 */
async function onTagPushEvent(gitRespData = {}) {
  // 是否为新增标签
  const isTagAdd = gitRespData?.total_commits_count === 1;
  if (!isTagAdd) return;

  try {
    cd(workTree);
    exec(`git switch master`);
    exec(`git pull`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  onPushEvent,
  onTagPushEvent,
};

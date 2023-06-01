const Config = {
  /**
   * 运行端口
   */
  port: 3001,
  /**
   * gitlab 上配置的 token
   * 如果有值，则进行检验，没有则不进行检验
   */
  token: "",

  /**
   * git配置，git 工作区
   * 使用 git 的时候，能正确指向执行的项目
   */
  workTree: `D:\\repo\\learn\\ci_cd\\auto-prj`,
};

module.exports = Config;

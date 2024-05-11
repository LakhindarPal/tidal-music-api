const { getInfo } = require("../lib/index");
(async () => {
  const url = "https://tidal.com/album/230064409";
  const info = await getInfo(url);
  console.log(info);
})();

const { getInfo } = require("../lib/index");
(async () => {
  const url = "https://tidal.com/album/70973001";
  const info = await getInfo(url);
  console.log(JSON.stringify(info, null, 2));
})();

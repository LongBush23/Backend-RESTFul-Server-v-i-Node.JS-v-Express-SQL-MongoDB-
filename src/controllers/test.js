const useConnection = require("./config/old");
const usePool = require("./config/database");
let oldCount = 0;
let oldSum = 0;
let poolCount = 0;
let poolSum = 0;
app.get("/old", async (req, res) => {
  const fromDate = new Date();
  oldCount++;
  //return all rows
  useConnection.query("select * from Users u", function (err, results, fields) {
    const toDate = new Date();
    const elapsed = toDate.getTime() - fromDate.getTime();
    oldSum += elapsed;
    //send it to the wire
    res.send({
      elapsed: elapsed,
      avg: Math.round(oldSum / oldCount),
      method: "old",
    });
  });
  //end
});
app.get("/pool", async (req, res) => {
  const fromDate = new Date();
  poolCount++;
  //return all rows
  usePool.query("select * from Users u", function (err, results, fields) {
    const toDate = new Date();
    const elapsed = toDate.getTime() - fromDate.getTime();
    poolSum += elapsed;
    //send it to the wire
    res.send({
      elapsed: elapsed,
      avg: Math.round(poolSum / poolCount),
      method: "pool",
    });
  });
});
/*
for (let i = 0; i < 1000; i++) fetch(`http://localhost:8081/old`).then(a=>a.json()).then(console.log).catch(console.error);
for (let i = 0; i < 1000; i++) fetch(`http://localhost:8081/pool`).then(a=>a.json()).then(console.log).catch(console.error);
*/

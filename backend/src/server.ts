
import app from "./app.js";

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running on port",port);
});

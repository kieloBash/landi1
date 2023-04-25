const { Router } = require("express");
const router = Router();
const { google } = require("googleapis");

router.get("/get", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "secrets.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "12lNWbyPiQhbGlELS0LcBBr9A2wjeG5eTySWQd28XDdI";

  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  //READ
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
  });

  res.send(getRows.data);
});

router.post("/post", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "secrets.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "12lNWbyPiQhbGlELS0LcBBr9A2wjeG5eTySWQd28XDdI";

  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  //WRITE
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["LongSleeves", 30]],
    },
  });
});

module.exports = router;

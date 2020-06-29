const fs = require("fs");

let parent = [];

fs.readFile("./Old.json", function read(err, data) {
  if (err) {
    throw err;
  }
  const content = JSON.parse(data);
  // console.log(content);
  processFile(content);
});

function processFile(content) {
  content.map((item, index) => {
    // console.log(index);
    // if (index < 5) {
    //   console.log(item.Street);
    // }
    // console.log("item.corporatePhone", item.corporatePhone);
    // console.log("item.item.otherPhone", item.otherPhone);
    // console.log("item", item);
    if (item.corporatePhone !== "" || item.otherPhone !== "") {
      let phone = "";
      if (item.corporatePhone !== "") {
        phone = item.corporatePhone;
      } else {
        phone = item.otherPhone;
      }

      if (phone !== "" || phone !== undefined) {
        let uidName = "";
        let tempName = item.Company;
        tempName = tempName.split(" ");
        for (let i = 0; i < tempName.length; i++) {
          if (tempName[i] !== "") {
            uidName = tempName[i];
            break;
          }
        }

        let uid = "";
        uid = phone;
        uid = uid.replace(/[^\w\s]/gi, "");
        uid = uid.replace(/\s/g, "");
        // uid = uid.split(".").join("");
        uid = uid.substring(0, 10);
        console.log("uid", uid);
        if (uid === "") {
          console.log("phone", phone);
          console.log("item.corporatePhone", item.corporatePhone);
          console.log("item.otherPhone", item.otherPhone);
        }
        let objArray = { address: {} };

        objArray.company = item.Company;
        objArray.website = item.Website;
        objArray.phone = phone;
        objArray.uid = uid;
        objArray.uidName = uidName;
        objArray.address.street = item.Street;
        objArray.address.city = item.City;
        objArray.address.state = item.State;
        objArray.address.zipcode = item.Zip;
        parent.push(objArray);
      }
    }
  });

  fs.writeFileSync("./forMongoOldFile.json", JSON.stringify(parent));
  //   console.log(content[0].Phone);
}

import * as functions from "firebase-functions";
// import algoliasearch from "algoliasearch";

// const algoliaAppId = "L8COK78FOO";
// const algoliaApiKey = "93e6fde77d63e8134b6ee71512137a14";

// export const historyOnCreate = functions.firestore
//     .document("history/{id}")
//     .onCreate(async (change, context) => {
//       console.log("here!");
//       const food = change.data;
//       const client = algoliasearch(algoliaAppId, algoliaApiKey);
//       const index = client.initIndex("history");
//       return index.saveObject({
//         ObjectID: change.id,
//         data: food,
//       });
//     });

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

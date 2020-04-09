//Setup
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router({ mergeParams: true });
var Content = require("./models/content");
var Comment = require("./models/comment");
var Review = require("./models/review");
var User = require("./models/user");

//Toraberu content Seeds
const userdata = {
  displayName: "Admin",
  username: "admin@gmail.com",
};
const contentdata = [
  {
    name: "Cliff of Moher",
    location: "County Clare, Ireland",
    description:
      "The Cliffs of Moher are sea cliffs located at the southwestern edge of the Burren region in County Clare, Ireland. The cliffs rank among the most visited tourist sites in Ireland, with around 1.5 million visits per annum. From the cliffs, and from atop the tower, visitors can see the Aran Islands in Galway Bay, the Maumturks and Twelve Pins mountain ranges to the north in County Galway, and Loop Head to the south.  Also there is O'Brien's Tower, a round stone tower near the midpoint of the cliffs, built in 1835 by Sir Cornelius O'Brien. You can travel to this place by car or by bus from town. Before traveling there, don‘t forget camera!",
    images: [
      "https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
      "https://cdn.pixabay.com/photo/2019/11/11/11/23/ireland-4618061_960_720.jpg",
      "https://cdn.pixabay.com/photo/2019/10/07/20/20/ireland-4533577_960_720.jpg",
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    },
  },
  {
    name: "The Underwater Prison",
    location: "Rummu, Estonia",
    description:
      "The ruins of the abandoned prison camp outside the small Estonian town of Rummu were once a dreaded stone edifice, but are now a beach attraction. The prison was already established in the 1940s by the Soviet Union. It was built in a convenient location, on the lip of a limestone quarry in which the inmates were forced to toil. The seemingly impenetrable walls of the prison were not to last forever. When Estonia regained its independence in 1991, the Soviets moved out and many of their institutions fell, including the labor prison at Rummu. Both the prison and the quarry were abandoned in the changeover. Without anyone to look after the natural groundwater that seeped into the former quarry, it soon filled up with water, creating a new lake with alarming speed. It filled up so fast that many of the mining machines and even some of the buildings were swallowed whole by the rising waters. The Rummu Prison is now open during summer as an adventure center with an entrance fee of 3€. Different activities such as snorkeling, paddleboarding, and canoeing to name a few.",
    images: [
      "https://images.unsplash.com/photo-1586442536404-7753d15725cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
      "/img/rummu2.jpg",
      "https://images.unsplash.com/photo-1584476347096-514ba7c836ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    },
  },
  {
    name: "Meteora",
    location: "Kalabaka, Greece",
    description:
      "Meteora in Greece, is an area that covers few square kilometers, where an ancient monastic community and a rare geological phenomenon of huge rock pillars coexist in absolute harmony. It’s a UNESCO World Heritage Site, an archeological site and an officially declared holy place! Located at the northwest tip of the plain of Thessaly, Meteora today has become one of the most popular destinations of mainland Greece. At the foothills of the rocks, there are 2 settlements, the town of Kalabaka and the village of Kastraki. Monasteries was build by monks who ran away from the Turkish attacks. At this time, access to the top was via removable ladders or windlass. Nowadays, getting up there is a lot simpler due to steps being carved into the rock during the 1920s. Of the 24 monasteries, only six (four of men, two of women) are still functioning, with each housing fewer than ten individuals. Before traveling there, don‘t forget to wear clothing that fully covers the legs, because of the sanctuary place.",
    images: [
      "https://cdn.pixabay.com/photo/2018/03/31/21/57/nature-3279419_960_720.jpg",
      "https://images.unsplash.com/photo-1517540527223-3bf9f21cc792?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      "https://images.unsplash.com/photo-1552482496-3c03befc5c25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1536506612649-fe504261a0fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      "https://images.unsplash.com/photo-1495386217358-4ffdde036fe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    },
  },
  {
    name: "Mykonos city",
    location: "Mykonos island, Greece",
    description:
      "Mykonos is an island in the Cyclades group in the Aegean Sea. It’s similar island to Santorini due to white marshmallows houses. It's popularly known for its summer party atmosphere. Beaches such as Paradise and Super Paradise have bars that blare thumping music. If you really hate hot weather it‘s advised to travel in May, because it‘s the best moth for those who want to travel and not relax at the beach. Talking about beaches… Whether you’re looking for a tiny, secluded cove lapped at by cerulean waters, or a wide stretch of sugar-white sand covered with sunworshippers, Mykonos has a beach to suit your needs. The island boasts 25 beaches, to be precise, and they’re justifiably its biggest natural attraction. If you are interested traveling to Mykonos, you will have to take ferries. The price is different by ferries company and month. For travel all around Mykonos island you can rent a car or bicycles.",
    images: [
      "https://cdn.pixabay.com/photo/2015/01/27/05/28/windmills-613459_960_720.jpg",
      "https://images.unsplash.com/photo-1509875684-631801a44a5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
      "/img/mykonos.jpg",
      "https://images.unsplash.com/photo-1495220782983-6675800b05c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80",
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      "https://cdn.pixabay.com/photo/2015/02/10/20/58/mykonos-631702_960_720.jpg",
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    },
  },
  {
    name: "Blue Lagoon",
    location: "Comino Island, Malta",
    description:
      "The Blue Lagoon is a part of the Maltese islands most often photographed because it just looks like a little slice of paradise. The Blue Lagoon provides one of the most spectacular sights of the Maltese archipelago, attracting hundreds of tourists every day during the busy summer months. It’s without a doubt the biggest attraction that brings people to Comino during summer. However be warned in July- September there are a lot of visitors, so the best way to travel there would be early in the morning. Also don‘t forget some kind of beach mat, because grown is pretty rocky. Also it‘s advice to swim with special swiming shoes.",
    images: [
      "https://images.unsplash.com/photo-1570527243923-5847e9d30baf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80",
      "https://images.unsplash.com/photo-1571674003841-16b36bda4bc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "/img/malta.jpg",
      "https://cdn.pixabay.com/photo/2016/01/13/17/20/comino-1138557_960_720.jpg",
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    },
  },
  {
    name: "Saxon Switzerland",
    location: "Germany",
    description:
      "The Saxon Switzerland National Park is Saxony's only national park. It is the only rock national park in Germany. The 93 km region between Pirna and the Czech border is one of the most beautiful landscapes in Europe. More than 700 summits are available to rock climbers, while for those who prefer to keep their feet on the ground, there are 400 km² of marked hiking-trails, steep treks, paths and some cycle routes through the National Park. Bastei, an imposing rock formation, is the most famous landmark in Saxon Switzerland National Park. What adds to its uniqueness is the Bastei Bridge, which seems to have merged naturally with the craggy rocks, making for a surreal sight. Travelers are welcome to stroll along the bridge and enjoy panoramic views of large stretches of the national park. Best of all, entry is free. The nearest airport to Saxon Switzerland National Park is Dresden, but other nearby airports include Prague and Leipzig. From each of these airports, you can catch train connections to the national park. Of course, you can also choose to drive to Saxon Switzerland National Park.",
    images: [
      "https://cdn.pixabay.com/photo/2017/12/12/11/37/bastei-bridge-3014467_960_720.jpg",
      "https://cdn.pixabay.com/photo/2014/11/20/16/34/saxon-switzerland-539418_960_720.jpg",
      "https://images.unsplash.com/photo-1569741059684-2405290a98c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1676&q=80",
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    },
  },

  {
    name: "Curonian Spit",
    location: "Curonian Spit National Park, Lithuania",
    description:
      "The Curonian Spit is a 98 km long, thin, curved sand-dune spit that separates the Curonian Lagoon from the Baltic Sea coast. It is a UNESCO World Heritage Site shared by the two countries. The Curonian Spit is home to the highest moving (drifting) sand dunes in Europe. Their average height is 35 meters, but some attain a height of 60 meters. While you there, don‘t forget to climb Parnidis and Dead Dunes, explore the Hill of Witches and catch the sunset to Baltic Sea. You can travel to Curonian Spit by taking ferrie from neariest city Klaipėda. It‘s improtant to mention that there is entrance flee you have to pay.",
    images: [
      "https://cdn.pixabay.com/photo/2015/08/19/20/46/nida-896633_960_720.jpg",
      "https://images.unsplash.com/photo-1583410949414-1be8d3250a0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
      "https://cdn.pixabay.com/photo/2018/07/10/08/53/sand-3528076_960_720.jpg",
      "https://cdn.pixabay.com/photo/2018/10/04/10/42/lithuania-3723361_960_720.jpg",
      "https://cdn.pixabay.com/photo/2018/07/06/01/21/sky-3519562_960_720.jpg",
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    },
  },
  {
    name: "Vouliagmeni Lake",
    location: "Athens, Greece",
    description:
      "Lake Vouliagmeni is a small brackish-water lake fed by underground currents seeping through the mass of Mount Hymettus located to the south of Vouliagmeni, Greece. The lagoon formed about 2,000 years ago. It was once a large cavern that collapsed following an earthquake. The lake has quite unique environmental conditions: it is supplied with warm seawater (28-35º Celsius) via an underground channel spreading through a network of flooded caves, so its temperature never drops below 18 °C. Because of its constant warm water temperature and its rich content in hydrogen sulphide, the lake functions as a spa. Span center working hours: 08.05 - 18.00. Ticket price is 4€ for hole day. There is free parking, sunbeds and umbrellas, restaurant, WC, dressing rooms and also lifeguarding services. Also in water there are Garra rufa fish, also known as the doctor fish. This small fish eats your dead skin cells.",
    images: [
      "/img/vouliagmeni.jpg",
      "https://images.unsplash.com/photo-1567734873341-2b835404dd3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
      "https://cdn.stocksnap.io/img-thumbs/960w/hand-palm_Y8KRPWD8ZO.jpg",
    ],
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
    },
  },
];

function seedDB() {
  //Clear all users, content, comments and reviews from DB
  User.remove({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      Content.remove({}, function (err) {
        if (err) {
          console.log(err);
        } else {
          Comment.remove({}, function (err) {
            if (err) {
              console.log(err);
            }
          });
          Review.remove({}, function (err) {
            if (err) {
              console.log(err);
            }
          });
        }
        //ADD user, content, comments and reviews seeds to db
        User.register(userdata, "iamunicorn", function (err, createdUser) {
          if (err) {
            console.log("Something went wrong with adding USER seeds");
            console.log(err);
          } else {
            console.log("User seed was created");
            contentdata.forEach(function (contentdata) {
              contentdata.author.id = createdUser._id;
              contentdata.author.username = createdUser.displayName;
              Content.create(contentdata, function (err, seedContent) {
                if (err) {
                  console.log("Something went wrong with adding CONTENT seed ");
                  console.log(err);
                } else {
                  console.log("CONTENT seed has been added.");
                  seedContent.save();
                }
              });
            });
          }
        });
      });
    }
  });
}

module.exports = seedDB;

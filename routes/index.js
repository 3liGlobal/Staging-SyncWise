const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const admin = require('firebase-admin');
const router = express.Router();
const ejs = require('ejs');
const { URL } = require('url');
const session = require('express-session');
var globalAccessToken;
const fetch = require('node-fetch')
// const getUser = require("./getUser")
const serviceAccount = {
  "type": "service_account",
  "project_id": "backup-app-97142",
  "private_key_id": "423cdc55f255992bb2042dc9ce8f9100d64dc3a5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCpqE0mVdgpaxwZ\n/LgWg8njkcrYD/5Bbi8nWxjv+/kb+4nY+zXHXA8izyEwSes9U45pouctwoaWrW6p\nx6ZYlKGlcaPhMKPxz4D76igXAHkGoUMEiRhocQmZPIM2pCYcJRVmUwbAKf8TWuqR\nq5fveiVob87HAk9OTEojh9R2Q/HAg24nt1qtojuERKnYRTByvp/ErtBGoIolVkRa\nkQlShWYn851xj2z0BkzCCCZi/4fTyRzh26TxvaWkQZAUHsUt8KZbxUVwkK9qWqd5\nkVXPNVieXt+m4rD2dgjIFYGt8UUqPcYCMCSv9BwZ+ngPUf3NOp5qgOCqHSBE3ZSb\nnim1accZAgMBAAECggEAF3YtzRpb/UZRqYpYTszE05Kq0XxMtfGt1ax0Y2OeDG+Z\nnYcH5dzmPvMT7OCcBmwSqqsbeymGgTnUrufsKh3LyNxRRGf8lAkVFkFIb/3hvrf4\nU5094duX7zf+EUVb+9JpBjB/I33rR1rwS1rGdRiYKbwkhULdgr9sFUPIbt5whSWt\n/WaNrX7kqNVTyZ+yWWyOUYXVN61zd7Aoj+FY02t1k0xPBVO2p2DHUl0zc9aGKDgk\nUEhXi6iWd0/zw2OxbmK+JDD4F3nvDZILAMFnZ6LO/v9b/zonFT5+AZMEwF2IZ2H6\nDJXesPhwb/I3x22XkZoHtI1y9bicbKYr8w5akPsbfQKBgQDgqtL1jZFSLBDPnWLm\nVzKZaHQp2KrEe/UE0ScSTMcs4J5vlRrFfmYWGGNyJnrzyBVnUuUcgFrjg9vRRBqa\nyuIcZcGDX9zVJc6MPR5ReGpUevCbDVqFC37anl0Te7zILCc1gD3PIn8BSpOVkjey\nRJMHaTZwpy6etFt8NGT2TpfBKwKBgQDBUX1nwDV1V862MEcaT41GZLLnWrSEoj54\nK5vxEae2FFnGO/cgUxicCT5mTXdxl4sE1cJPRYPNrqoScQJ50IIGXITWayXXZo26\nfy9OFw/6D08cq6l+cYt/LDSYBMa6YAI+Lkg5ghIA9Bqnk3awrglQmQccc+4/bnt3\n+9IjoWnOywKBgQDJUmoeHlDVqKUb1jX0oLi33XESupQz47wpJ97yOBjXLyTqaluG\nFAEY1Zvvg2n0IByF7TNfeel4LQWCnZuVkC5UMh7ZQcLawbk30+DiMpxdvZjz6GBw\nDmALOZPATMZbPa2Y9KTug0P5/UEI6/C671YtcuuUwUs2bfn47951FPJJ5wKBgQCR\nYDqyPvT0nWex0nRl8NUIzslK+gcuhuP7cq/+hYxdfMhWLtoU0Oh8zubCABeGsLO2\nmxlYi6omjucOnzWBba+aIRE0PbdjWJfUW7izPNyi68hOgzkfATwqEpAqkczwcyq8\noAloVcw8M1WoF1j2XKpclfenCfdsdCUdgZ3xdX0gKQKBgQCXvmuymlrTsQ6SJz5w\nomYLROnF6RLrkbtPnXTUdAB0tk99gry70vEbXL2jgEYtsOXqIY0s6heaZx1KXHWm\nK7fy3cbFb5v8qkBuxi9qICeY2PQW2cAwTA+WBJQWTS5mRF405QQYMlphPW5yyHTu\nhFLcTND1PUyK1RrpxbrjnLSfKA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ukire@backup-app-97142.iam.gserviceaccount.com",
  "client_id": "100130433300040407495",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ukire%40backup-app-97142.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://backup-app-97142-default-rtdb.firebaseio.com'
});
const app = express();
app.set('view engine', 'ejs');
router.use(session({
  secret: 'Databeys@786', // Change this to a secret key for better security
  resave: false,
  saveUninitialized: true
}));
const checkLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    // User is logged in, proceed to next middleware or route handler
    next();
  } else {
    // User is not logged in, redirect to login page or send an error response
    res.send(`
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Unauthorized Access</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Please log in to access this page.</p>
            </div>
            <div class="modal-footer">
              <a href="/" class="btn btn-primary">Log In</a>
            </div>
          </div>
        </div>
      </div>
      <script>
        // Show the modal when the page loads
        $(document).ready(function() {
          $('.modal').modal('show');
        });
      </script>
    `);
  }
};
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.get('/welcome',checkLoggedIn, (req, res) => res.render('welcome'));
router.get('/signup', (req, res) => res.render('signup'));
router.post('/register', (req, res) => {
  
  const { name, email, password } = req.body;
  console.log(name)
  // Create a reference to the Firebase database
  const db = admin.database();
  const usersRef = db.ref('users');
console.log(usersRef)
  // Push the registration data to Firebase
  usersRef.push({
    name: name,
    email: email,
    password: password
  })
  .then(() => {
    res.render('login', { message: 'Registration successful' });;
  })
  .catch(error => {
    res.status(500).send('Error registering user: ' + error.message);
  });
});
router.get('/', (req, res) => res.render('login'));
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = admin.database();
  const usersRef = db.ref('users');
  usersRef.orderByChild("email").equalTo(email).once("value", function(snapshot) {
    const users = snapshot.val();
    if (users) {
      const userId = Object.keys(users)[0];
      const user = users[userId];
      if (user.password === password) {
        // Set loggedIn property in session
        req.session.loggedIn = true;
        // Successful login
        res.send('success');
      } else {
        res.send('Incorrect password');
      }
    } else {
      res.send('User not found');
    }
  });
});
router.get('/Users',checkLoggedIn, (req, res) => {
  console.log("HERE")
  

  console.log(globalAccessToken)
  const db = admin.database();
  const usersRef = db.ref('users_Data2024-03-11_16-51-13');
  // console.log(usersRef)
  usersRef.once('value', (snapshot) => {
    console.log("here2")
    const usersData = snapshot.val();

    if (usersData) {
      // Convert the object of sub-objects into an array of objects
      const userDataArray = Object.values(usersData);
      // console.log(userDataArray)
      res.render('allUsers', { usersData: userDataArray });
    } else {
      console.error('No data found in usersData node');
      res.status(404).send('Not Found');
    }
  }, (errorObject) => {
    console.error('The read failed: ' + errorObject.code);
    res.status(500).send('Internal Server Error');
  });
});
router.get('/tickets', checkLoggedIn,(req, res) => {
  console.log("HERE")
  const db = admin.database();
  const usersRef = db.ref('tickets_Data2024-03-11_16-51-14');
  // console.log(usersRef)
  usersRef.once('value', (snapshot) => {
    console.log("here2")
    const usersData = snapshot.val();

    if (usersData) {
      // Convert the object of sub-objects into an array of objects
      const userDataArray = Object.values(usersData);
      console.log(userDataArray)
      res.render('allTickets', { usersData: userDataArray });
    } else {
      console.error('No data found in usersData node');
      res.status(404).send('Not Found');
    }
  }, (errorObject) => {
    console.error('The read failed: ' + errorObject.code);
    res.status(500).send('Internal Server Error');
  });
});
router.get('/organizations',checkLoggedIn, (req, res) => {
  console.log("HERE")
  const db = admin.database();
  const usersRef = db.ref('organizations_Data2024-03-11_16-51-12');
  // console.log(usersRef)
  usersRef.once('value', (snapshot) => {
    console.log("here2")
    const usersData = snapshot.val();

    if (usersData) {
      // Convert the object of sub-objects into an array of objects
      const userDataArray = Object.values(usersData);
      console.log(userDataArray)
      res.render('allOrganizations', { usersData: userDataArray });
    } else {
      console.error('No data found in usersData node');
      res.status(404).send('Not Found');
    }
  }, (errorObject) => {
    console.error('The read failed: ' + errorObject.code);
    res.status(500).send('Internal Server Error');
  });
});
// router.get('/ticketComments', (req, res) => {
//   console.log("HERE")
//   const db = admin.database();
//   const usersRef = db.ref('ticketComments');
//   // console.log(usersRef)
//   usersRef.once('value', (snapshot) => {
//     console.log("here2")
//     const usersData = snapshot.val();

//     if (usersData) {
//       // Convert the object of sub-objects into an array of objects
//       const userDataArray = Object.values(usersData);
//       console.log(userDataArray)
//       res.render('ticketComments', { usersData: userDataArray });
//     } else {
//       console.error('No data found in usersData node');
//       res.status(404).send('Not Found');
//     }
//   }, (errorObject) => {
//     console.error('The read failed: ' + errorObject.code);
//     res.status(500).send('Internal Server Error');
//   });
// });
router.get('/custom',checkLoggedIn, (req, res) => {
  console.log("HERE")
  const db = admin.database();
  const usersRef = db.ref('custom_module_record2024-03-11_16-51-12');
  // console.log(usersRef)
  usersRef.once('value', (snapshot) => {
    console.log("here2")
    const usersData = snapshot.val();

    if (usersData) {
      // Convert the object of sub-objects into an array of objects
      const userDataArray = Object.values(usersData);
      console.log(userDataArray)
      res.render('allCustomModule', { usersData: userDataArray });
    } else {
      console.error('No data found in usersData node');
      res.status(404).send('Not Found');
    }
  }, (errorObject) => {
    console.error('The read failed: ' + errorObject.code);
    res.status(500).send('Internal Server Error');
  });
});
router.post('/insertUser',checkLoggedIn, (req, res) => {
  console.log("HERE")

  const selectedData = req.body.selectedData;
  const action = req.body.action;
  const encodedToken = req.session.encodedToken
  console.log("rec data : ", selectedData)
  console.log("action : ", action)
  console.log("encodedToken : ", encodedToken)


    
  selectedData.forEach((data, index) => {
    // console.log(data)
      const customerName = data.name;
      const customerEmail = data.email;
      const organization_id = data.organization_id
      const userId = data.id;
      const role = data.role;
      const requestData ={ "user": {
        name: customerName,
        email: customerEmail,
        role: role
    }
  };
 const sendedData = JSON.stringify(requestData);
      console.log("sedned data",sendedData)
      if(action == 'insert'){
        console.log("in insert")
        const options = {
          method: 'POST',
          url: 'https://pdi-databeys.zendesk.com/api/v2/users',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZmFpemFuQGRhdGFiZXlzLmNvbS90b2tlbjpJN0UzRjB1SHNWN2lYVWJJcG1MV3ZGSHpTUElvZkZyWXFLdFBNWUx4',
            'Cookie': '__cfruid=68de82315c4cba703ede0094cf6c9a52769611a5-1709793104; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
          },
          body:sendedData
        };
      
        request(options, function (error, response, body) {
          if (error) {
            console.error(error);
            return res.status(500).send('Error creating user in Zendesk');
          }
          console.log(body);
        });
      }
      else{
        console.log("in update")
        const options = {
          method: 'PUT',
          url: `https://pdi-databeys.zendesk.com/api/v2/users/${userId}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZmFpemFuQGRhdGFiZXlzLmNvbS90b2tlbjpJN0UzRjB1SHNWN2lYVWJJcG1MV3ZGSHpTUElvZkZyWXFLdFBNWUx4',
            'Cookie': '__cfruid=68de82315c4cba703ede0094cf6c9a52769611a5-1709793104; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
          },
          body:sendedData
        };
      
        request(options, function (error, response, body) {
          if (error) {
            console.error(error);
            return res.status(500).send('Error creating user in Zendesk');
          }
          console.log(body);
        });
      }
      
    });
    res.send("Data received successfully."); 
      // console.log(`Data ${index + 1}: Name - ${customerName}, Email - ${customerEmail},orginization_id - ${organization_id},role - ${role}`);
      // Perform your backend tasks here with each object's properties
      // For example, you can insert data into the database based on the properties
});
router.post('/insertModule',checkLoggedIn, (req, res) => {
  console.log("HERE Module")

  const selectedData = req.body;
  console.log("rec data : ", selectedData)

    
  selectedData.forEach((data, index) => {
    // console.log(data)
      const key = "Test";
      const title = data.title;
      const title_pluralized = data.title_pluralized
      const description = data.description;
      const requestData ={ "custom_object": {
        key: key,
        title: title,
        title_pluralized: title_pluralized,
        description:description
    }
  };
 const sendedData = JSON.stringify(requestData);
      console.log("sedned data",sendedData)
      const options = {
        method: 'POST',
        url: 'https://pdi-databeys.zendesk.com/api/v2/custom_objects',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ZmFpemFuQGRhdGFiZXlzLmNvbS90b2tlbjpJN0UzRjB1SHNWN2lYVWJJcG1MV3ZGSHpTUElvZkZyWXFLdFBNWUx4',
          'Cookie': '__cfruid=68de82315c4cba703ede0094cf6c9a52769611a5-1709793104; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
        },
        body:sendedData
      };
    
      request(options, function (error, response, body) {
        if (error) {
          console.error(error);
          return res.status(500).send('Error creating user in Zendesk');
        }
        console.log(body);
      });
    });
    res.send("Data received successfully."); 
      // console.log(`Data ${index + 1}: Name - ${customerName}, Email - ${customerEmail},orginization_id - ${organization_id},role - ${role}`);
      // Perform your backend tasks here with each object's properties
      // For example, you can insert data into the database based on the properties
});
router.post('/insertOrganization',checkLoggedIn, (req, res) => {
  console.log("HERE Organization")

  const selectedData = req.body;
  console.log(selectedData)
    
  selectedData.forEach((data, index) => {
    // console.log(data)
      const customerName = data.name;
      const customerEmail = data.email;
      const organization_id = data.organization_id
      const role = data.role;
      const requestData ={ "organization":  {
        name: customerName,
    }
  };
 const sendedData = JSON.stringify(requestData);
    console.log("sedned data",sendedData)
    const options = {
      method: 'POST',
      url: 'https://pdi-databeys.zendesk.com/api/v2/organizations',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZmFpemFuQGRhdGFiZXlzLmNvbS90b2tlbjpJN0UzRjB1SHNWN2lYVWJJcG1MV3ZGSHpTUElvZkZyWXFLdFBNWUx4',
        'Cookie': '__cfruid=68de82315c4cba703ede0094cf6c9a52769611a5-1709793104; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
      },
      body:sendedData
    };
  
    request(options, function (error, response, body) {
      if (error) {
        console.error(error);
        return res.status(500).send('Error creating user in Zendesk');
      }
      console.log(body);
    });
console.log("ssddd",options)
      // console.log(`Data ${index + 1}: Name - ${customerName}, Email - ${customerEmail},orginization_id - ${organization_id},role - ${role}`);
      // Perform your backend tasks here with each object's properties
      // For example, you can insert data into the database based on the properties
  });

  res.send("Data received successfully."); 
});
router.post('/insertTicket', checkLoggedIn,(req, res) => {
  console.log("HERE Ticket")

  const selectedData = req.body;
  // console.log(selectedData)
    
  selectedData.forEach((data, index) => {
     console.log("Dataaa",data)
      const subject = data.subject;
      const status = data.status;
      const requester_id = data.requester_id
      const assignee_id = data.assignee_id;
      const description =data.description;
      const ticket_id = data.id;
      const requestData ={ "ticket":  {
        subject: subject,
        status: status,
        description : description,
        requester_id : requester_id,
        assignee_id : assignee_id,
        id: ticket_id
    }
  };
 const sendedData = JSON.stringify(requestData);
     console.log("sedned data",sendedData)
     const options = {
      method: 'POST',
      url: 'https://pdi-databeys.zendesk.com/api/v2/tickets',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZmFpemFuQGRhdGFiZXlzLmNvbS90b2tlbjpJN0UzRjB1SHNWN2lYVWJJcG1MV3ZGSHpTUElvZkZyWXFLdFBNWUx4',
        'Cookie': '__cfruid=68de82315c4cba703ede0094cf6c9a52769611a5-1709793104; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
      },
      body:sendedData
    };
  
    request(options, function (error, response, body) {
      if (error) {
        console.error(error);
        return res.status(500).send('Error creating user in Zendesk');
      }
      console.log(body);
    });
// console.log("ssddd",options)
      // console.log(`Data ${index + 1}: Name - ${customerName}, Email - ${customerEmail},orginization_id - ${organization_id},role - ${role}`);
      // Perform your backend tasks here with each object's properties
      // For example, you can insert data into the database based on the properties
  });

  res.send("Data received successfully."); 
});
router.post('/authentication', checkLoggedIn,(req, res) => {
  // Check if req.body is defined before accessing its properties
  if (req.body && req.body.encodedToken) {
      const encodedToken = req.body.encodedToken;
      console.log(encodedToken)
      const domain = req.body.url;
      req.session.encodedToken = encodedToken;
      req.session.domain = domain;  
      console.log("Domain : ",req.session.encodedToken);
      const hostname = new URL(domain).hostname;
      const parts = hostname.split('.');
      const subdomain = parts[0];
      console.log(encodedToken);
      console.log(subdomain);
      var options = {
        'method': 'GET',
        'url': `${domain}/api/v2/tickets/`,
        'headers': {
            'Authorization': `Basic ${encodedToken}`,
            'Accept': 'application/json',
            'Cookie': '__cfruid=8edf14935979a346f3d28331cf39915407f7dde9-1709548581; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
        }
      };
      var options2= {
        'method': 'GET',
        'url': `${domain}/api/v2/users/`,
        'headers': {
            'Authorization': `Basic ${encodedToken}`,
            'Accept': 'application/json',
            'Cookie': '__cfruid=8edf14935979a346f3d28331cf39915407f7dde9-1709548581; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
        }
      };
      var options3 = {
    'method': 'GET',
    'url': `${domain}/api/v2/organizations`,
    'headers': {
        'Authorization': `Basic ${encodedToken}`,
        'Accept': 'application/json',
        'Cookie': '__cfruid=8edf14935979a346f3d28331cf39915407f7dde9-1709548581; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
    }
      };
      var options4 = {
        'method': 'GET',
        'url': `${domain}/api/v2/custom_objects/`,
        'headers': {
            'Authorization': `Basic ${encodedToken}`,
            'Accept': 'application/json',
            'Cookie': '__cfruid=8edf14935979a346f3d28331cf39915407f7dde9-1709548581; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
        }
      };
  const db = admin.database();
  const usersCollection = db.ref(`${subdomain}/users_Data${getCurrentDateTimeString()}`);
  const ticketsCollection = db.ref(`${subdomain}/tickets_Data${getCurrentDateTimeString()}`);
  const organizationsCollection = db.ref(`${subdomain}/organizations_Data${getCurrentDateTimeString()}`);
  const customCollections = db.ref(`${subdomain}/custom_module_record${getCurrentDateTimeString()}`);
  // Start fetching data from the initial URL
  fetchDataUsers(options2.url, usersCollection);
  fetchDataTickets(options.url, ticketsCollection);  
  fetchDataOrganizations(options3.url, organizationsCollection);
  fetchDataCustom(options4.url, customCollections); 
function fetchDataUsers(url, usersCollection) {
    options2.url = url;

    request(options2, function (error, response) {
        if (error) {
            console.error('Error fetching user data: ', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        var parseData = JSON.parse(response.body);
        var userDataArray = parseData.users;

        console.log("Retrieved", userDataArray.length, "records from", url); // Log the number of records retrieved from each page

        let recordsSavedCount = 0; // Counter to keep track of the number of records saved

        userDataArray.forEach((data) => {
            usersCollection.push(data)
                .then(() => {
                    recordsSavedCount++; // Increment the counter for each record successfully saved

                    // Check if all records are saved and log the total count if so
                    if (recordsSavedCount === userDataArray.length) {
                        console.log("Total number of records saved in Firebase: ", recordsSavedCount);
                    }
                })
                .catch((error) => {
                    console.error('Error adding data: ', error);
                });
        });

        // Check if there are more pages, if yes, fetch them recursively
        if (parseData.next_page) {
            fetchDataUsers(parseData.next_page, usersCollection);
        }
    });
}
function fetchDataTickets(url, ticketsCollection) {
    options.url = url;

    request(options, function (error, response) {
        if (error) {
            console.error('Error fetching user data: ', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        var parseData = JSON.parse(response.body);
        var userDataArray = parseData.tickets;
    //  ?   console.log("Tickets Data : ", userDataArray)
        var ids = [];

        // Loop through each object in userDataArray
        userDataArray.forEach(function(ticket) {
            // Push the ID of each object to the ids array
            ids.push(ticket.id);
        });
        console.log(ids)
        ids.forEach(function(ticketId) {
          // fetchDataTicketComments(ticketId);
      });
      
        console.log("Retrieved", userDataArray.length, "records from", url); // Log the number of records retrieved from each page

        let recordsSavedCount = 0; // Counter to keep track of the number of records saved

        userDataArray.forEach((data) => {
          ticketsCollection.push(data)
                .then(() => {
                    recordsSavedCount++; // Increment the counter for each record successfully saved

                    // Check if all records are saved and log the total count if so
                    if (recordsSavedCount === userDataArray.length) {
                        console.log("Total number of records saved in Firebase: ", recordsSavedCount);
                    }
                })
                .catch((error) => {
                    console.error('Error adding data: ', error);
                });
        });

        // Check if there are more pages, if yes, fetch them recursively
        if (parseData.next_page) {
            fetchDataTickets(parseData.next_page, ticketsCollection);
        }
    });
}
// function fetchDataTicketComments(ticketId) {
//   var options = {
//       'method': 'GET',
//       'url': `https://pdi-databeys.zendesk.com/api/v2/tickets/${ticketId}/comments`,
//       'headers': {
//           'Content-Type': 'application/json',
//           'Authorization': 'Basic ZmFpemFuQGRhdGFiZXlzLmNvbTpGYWl6MmsxN0Bjcw==',
//           'Cookie': '__cfruid=6863e24f644f9a6a10138b0ea7fdc89c6aa1ef78-1710309674; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca'
//       }
//   };

//   request(options, function (error, response) {
//       if (error) throw new Error(error);
//       // console.log(response.body);
//       const commentsCollection = db.ref(`ticketComments/${ticketId}/ticketsComments_Data_${getCurrentDateTimeString()}`);
//       var parseData = JSON.parse(response.body);
//         var userDataArray = parseData.comments;
//         userDataArray.forEach((data) => {
//           commentsCollection.push(data)
//                 .then(() => {
                   
//                 })
//                 .catch((error) => {
//                     console.error('Error adding data: ', error);
//                 });
//         });
//   });
// }
function fetchDataOrganizations(url, organizationsCollection) {
  options3.url = url;

  request(options3, function (error, response) {
      if (error) {
          console.error('Error fetching user data: ', error);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      var parseData = JSON.parse(response.body);
      var userDataArray = parseData.organizations;

      console.log("Retrieved", userDataArray.length, "records from", url); // Log the number of records retrieved from each page

      let recordsSavedCount = 0; // Counter to keep track of the number of records saved

      userDataArray.forEach((data) => {
        organizationsCollection.push(data)
              .then(() => {
                  recordsSavedCount++; // Increment the counter for each record successfully saved

                  // Check if all records are saved and log the total count if so
                  if (recordsSavedCount === userDataArray.length) {
                      console.log("Total number of records saved in Firebase: ", recordsSavedCount);
                  }
              })
              .catch((error) => {
                  console.error('Error adding data: ', error);
              });
      });

      // Check if there are more pages, if yes, fetch them recursively
      if (parseData.next_page) {
          fetchDataOrganizations(parseData.next_page, organizationsCollection);
      }
  });
}
function fetchDataCustom(url, customCollection) {
  options4.url = url;

  request(options4, function (error, response) {
      if (error) {
          console.error('Error fetching user data: ', error);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      var parseData = JSON.parse(response.body);
      var userDataArray = parseData.custom_objects;

      console.log("Retrieved", userDataArray.length, "records from", url); // Log the number of records retrieved from each page

      let recordsSavedCount = 0; // Counter to keep track of the number of records saved

      userDataArray.forEach((data) => {
        customCollection.push(data)
              .then(() => {
                  recordsSavedCount++; // Increment the counter for each record successfully saved

                  // Check if all records are saved and log the total count if so
                  if (recordsSavedCount === userDataArray.length) {
                      console.log("Total number of records saved in Firebase: ", recordsSavedCount);
                  }
              })
              .catch((error) => {
                  console.error('Error adding data: ', error);
              });
      });

      // Check if there are more pages, if yes, fetch them recursively
      if (parseData.next_page) {
          fetchDataCustom(parseData.next_page, customCollection);
      }
  });
}
} 
else {
      // Handle the case where req.body or req.body.encodedToken is undefined
      res.status(400).json({ error: 'Bad Request: encodedToken is missing' });
  }
});
router.get('/allBackups',checkLoggedIn, async (req, res) => {
  try {
    const db = admin.database();
const ref = db.ref('/');

// Fetch data from Firebase
const snapshot = await ref.once('value');
const tables = snapshot.val();

// Create an array to store table names and their data counts
const tableData = [];

// Iterate through the tables object, excluding the "users" table, and count the number of entries in each table
for (const tableName in tables) {
  if (tables.hasOwnProperty(tableName) && tableName !== 'users') {
    const tableCount = Object.keys(tables[tableName]).length;
    tableData.push({ tableName, count: tableCount });
  }
}

// Render the table names and their respective data counts
res.render('allTables', { tableData });

  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/loginsessions', (req, res) => {
    req.session.username = "Asdgs";
    res.send(200)
});
router.get('/loginsession', (req, res) => {
  console.log("Session "+req.session.username)
});
function getCurrentDateTimeString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}
function getTimestampFromTableName(tableName) {
  // Extract timestamp from table name and convert it to milliseconds
  const parts = tableName.split('_');
  if (parts.length === 3) {
      const datePart = parts[1];
      const timePart = parts[2];
      const [year, month, day] = datePart.split('-');
      const [hour, minute, second] = timePart.split('-');
      const timestamp = new Date(year, month - 1, day, hour, minute, second).getTime();
      return timestamp;
  }
  return 0;
}


module.exports = router;

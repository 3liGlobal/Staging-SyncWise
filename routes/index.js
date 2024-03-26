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
  "project_id": "staging-syncwise",
  "private_key_id": "7276f6af6ec766852e725404665f2227731ff2cc",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDl4peqQMtx3Q5P\nabN0X9+QVrmX6DMsR3bNIOT0rXulGrr0GDbj2Gek4yi8Hen0oZF6fP194UtfwQYV\nRk3URqwhpaIgtR9HFxQ5SPHB+NqBytoppRhEVDD+BNLLe73X6nF0HQJFN3z7Gl2o\ny2H1EpjjvfJpJpl2NgXvIo+Vr63qWPMOkhtOIVkkhtnagnEiTjpfFhxL9WT9ZekA\nOdaqp02qGDFMfKAdALW8PjrmkWAD/BCyaxghoj4w2I9Ucl6WzGHJ6JnjHWLQmzS0\nxW2bvx1issL1ng42OlVP78vpUrQCk+Xb6X5OHuQFROmxrRwmLfkSTJA8/h4iv1aA\nvQdCdHubAgMBAAECggEAAtoNwZnuLCpu3ANWq5Ho5xR8VusVf24fhinrTTG9v+2V\n9iM6wxbTKlN7FOJWHafHczqLtn0N/1EYrzjhDEoYJo60dS1qBuq9YHyMKzjYFRYc\nILogk/BrbytGJioRz9TjtWoKtisbDM5l7Qsg2vZxGRopIK7O5o2DA1VtbJDyWl7c\nFk0JcZ2Kkhn0oA1DZY6pWGeuPyboRNrMBCIdqCoTdZumBfKOueOSD48FZDCNCZux\nXcP9yk1sCbElUWYSmqQKh6pcASUZzuLjFmI/SSEOPc8qubKVShQELte0BTLBiAFJ\nX4wfyJrqUAHHmXoz5x1wekA5ic14xnOfk1dtToSuGQKBgQD+8Ww9MVD/OYVQOKBj\nbu81ahmCsxGS92Mathyf+6e0ePyCPt60gYFsHWJ7PuYrvAFxh9XkNCUqQmmYERNi\n3CKW09IFTkUYPjgeBtwQLfxIOywU3/SulhTCYQGMtW+mgB9uLaLhcXRi9EatS43H\nQBAgGJjiEQ924iBQhq2+YCz4hQKBgQDm1pM2Y6rSUNzISrIM0AHYOP5IuZbbOuP8\n6gh/VVdBH8Ftr0iwlWvH2RYEjErHSBBbUnXauSaxVkl93JibJncK+ZY2RcasMI3r\nxRuJFDoOgXQ/mnH1TTx6arcvfVM8gJ98xWuqLByEjfkBv+0lQGFcYRPJPjE6Axfu\nDoa8dpftnwJ/N8SX6Mrg7POoNeQtMZMSwJx0+CIztfJnu3Aa0uQ5y0Cr+9HE5bdu\nmDfVUyBvOSHnLu6H22OMvbHJZ3pUw0tkRZoQVxjIBIWXwPm/KcrlZOeMvQRAgfBS\nmjKeJCmMQt/EAFX7S1WGIB9PVpkwamWZIWxABTO2LktIxlSvrPVc4QKBgBSPNetZ\nMySqOQ/Jv1PuzstAQD2f8fSyqQ2kln8oza2qM2Megn3fwQq6pgBfsmVPYM2RaZfC\nd9TBl6gTFrBy25Vpp1xMGKbLaEiAdLRfzc/u7bige9faOjG5AXnEUr6HwiyttKoi\nZaPUtUHXozp3InTE3KtG08GT9vSn7I4qjduHAoGBAJ8UjZ6gYculGR9RnazmGdU/\nymempcSgujXX2EfvMEv5vIPOpG6tvE/bQqWNYPkEoRRxsnS2cXCtlmBO9AvD9Cu8\n8HmnuK4bo87cc/AKD/RAmslIP1oZcNLI0FCUY/ebjPHuMb142vBhezao27IqqzGn\nH+AqzM39hSsRcDqCjA1T\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-nkcvh@staging-syncwise.iam.gserviceaccount.com",
  "client_id": "118153536721277167053",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nkcvh%40staging-syncwise.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://staging-syncwise-default-rtdb.firebaseio.com'
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
router.get('/welcome', checkLoggedIn,(req, res) => res.render('welcome'));
router.get('/signup', (req, res) => res.render('signup'));
router.post('/register', (req, res) => {
  
  const { name, email, password } = req.body;
  const userRecord =  admin.auth().createUser({
    displayName: name,
    email: email,
    password: password,
  })
    res.render('login', { message: 'Registration successful' });
});
router.get('/', (req, res) => res.render('login'));
const sessionCookieDuration = 7 * 24 * 60 * 60 * 1000;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get user by email
    const userRecord = await admin.auth().getUserByEmail(email);
     console.log(userRecord.email )
    // Check if user exists
    if (!userRecord)  {
      res.send('User not found');
      return;
    }


    // Set loggedIn property in session
    req.session.loggedEmail = userRecord.email;
    req.session.loggedIn = true;

    // Successful login
    res.send('success');
  } catch (error) {
    console.error("Error logging in:", error.code, error.message);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      res.send('Incorrect email or password');
    } else {
      res.status(500).send('Error logging in: ' + error.message);
    }
  }
});
router.get('/Users', checkLoggedIn, (req, res) => {
  console.log(req.session.loggedEmail)
  

  console.log(globalAccessToken)
  const db = admin.database();
  const usersRef = db.ref('zendesk/pdi-databeys/users_Data2024-03-25_12-35-46');
  console.log(usersRef)
  usersRef.once('value', (snapshot) => {
    console.log("here2")
    const usersData = snapshot.val();
    console.log(usersData)

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
  const usersRef = db.ref('zendesk/pdi-databeys/tickets_Data2024-03-25_12-35-46');
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
router.get('/organizations', checkLoggedIn,(req, res) => {
  console.log("HERE")
  const db = admin.database();
  const usersRef = db.ref('zendesk/pdi-databeys/organizations_Data2024-03-25_12-35-46');
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
  const usersRef = db.ref('zendesk/pdi-databeys/custom_module-record2024-03-25_12-35-46');
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
router.post('/insertUser', checkLoggedIn,(req, res) => {
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
router.post('/insertModule', checkLoggedIn,(req, res) => {
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
router.post('/insertOrganization', checkLoggedIn,(req, res) => {
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
router.post('/authentication', (req, res) => {
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
      const account = parts[1];
      console.log(encodedToken);
      console.log(subdomain);
      console.log(account);
      // return null
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
  const usersCollection = db.ref(`${account}/${subdomain}/users_Data${getCurrentDateTimeString()}`);
  const ticketsCollection = db.ref(`${account}/${subdomain}/tickets_Data${getCurrentDateTimeString()}`);
  const organizationsCollection = db.ref(`${account}/${subdomain}/organizations_Data${getCurrentDateTimeString()}`);
  const customCollections = db.ref(`${account}/${subdomain}/custom_module_record${getCurrentDateTimeString()}`);
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
router.get('/allBackups', checkLoggedIn, async (req, res) => {
  try {
    const db = admin.database();
const ref = db.ref('/zendesk/pdi-databeys');

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

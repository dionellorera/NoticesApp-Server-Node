var admin = require("firebase-admin");
var http = require('http'); 
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 


//parse for post requests , JSON and url encoded
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));   

//firebase
admin.initializeApp({
  credential: admin.credential.cert({
  	projectId: "noticesapp",
  	clientEmail: "firebase-adminsdk-t96rq@noticesapp.iam.gserviceaccount.com",
  	privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDHnoN92cqh3oOp\nNBiok5w4A/f51hKq2nQxbSN6Yv6NGTMrR0Wpvq6Wcuyq14IsiViexGXcleX6VHoc\npOlOQxULR8SktUum1iLL+1ktKHEPfCRW5SdqSnc6jNUF2Gl5xmHZJamNjlT5tvAs\nI4k+X1ArHedh3OuO8xyaUs4txbx8IB/9O/5/ZJcyvws8Prp/3NZx4dNkDsCRiKjJ\n0gEJhRGfw2dIg7TA+k6IIX8B4MgE6x0K7wpeVcY606bRox3g2Nld2UFtbV41uSTu\nc96yx85hOMzFp+ea1itkVLNIJN7R3du0E/VRoTA4wpnG6NMOtUl4T8/dLVi82CeN\n0VGD4bXxAgMBAAECggEBALSH0ReSTkXSPXRbHynmRVQLksqqJjvKUWcZ8woOWXQ2\nJCax0HjRcIez7AId4SZyGGmN6Slzj4ezurQJGM6ksHWBNIBZTc/WvaWI7X9/obCF\nbz//AoSIUAftsgIVVF7DYV7HRu40mPk1z0O757U28gPsiYPiDk874tRWqwyOVgZS\nU1ZrnEbk+Dqj+81M5MXh1aprfJ80EfxlO3/L/Wy9tqARMVZciJQL6PknYEYw/NGh\nO3y0icrtueY0rdOUNJuLmw4bug1evVwuZj6PdblcTzZaoLrUNo6CxKFuYvwq/yJE\nBTv0pubgI4/53/0rHrb/cl8qbxXvGT0RD4xifSUegbkCgYEA/9KbjqfPRFGu22Ms\n9lnssZGywvvIvx9j+chmx+JE2vkhiCNkx3aOb46WiXR2xviw4prTqVL2F85cqJ8n\nNbHCCDC8jlp34oza9K43d2fEFfnyIuY65GCwLEb863IKA3d8jG+gEjXMhwGBeM83\npf4CAmVd3olDpYgrypcdOpZvBjsCgYEAx8Hu9Q2g65mHBiCcIuZbR6Tx84jhbFgw\nLFYNQfqIi7tW5ILq4FSfCmmxsBETXWhAohc8EJRoRePqIm8vp5qlNeAswfZEavvF\not7C2dFeMmJGasEKVqMBMR8k2LsREpCA6UPOJ7MuItGOejuNBBwjC18C/DghggSO\nUOXvpRv1dcMCgYEAjgY+llRTnXo7uVC2BY6m+W4J8HYYXQLwXhwD87SKxYbKNupv\naM1JBmYC7QzbZFts2GFcYQTN2ymWB4dUHVsyfZmRFPbk18GbTXvrDz9sfUbmRrnK\nuD91jx9aCtyk8ofDfbP7CiEUC1+qoYdpPZ5nPy1Hj+RkyeFvbmm2sHAT80ECgYEA\noz4L/nzdtctoOYyqrCaeD8Vu6HtC5NyIuaK1AOcxcSdukh2evibJNaQ8TksWDS5m\nK1BbiJ0PPZZMv0kno4tQWd/SE8wiC1+nGjt69rAPj5MaQqFwxm49ShxOa0MsZ4Rp\npLcBoRXfrRqdmaxSyDoKNX+2m9FvKKZ6ewf9OGvJwysCgYAkDAaOLhMDcUy9x5K/\niEMSk7AkNs9IkynV5lqevMsrQtUNyJs1QTF2s5sblJESo9Qk8W7oCRSVdmWtzUfn\nhOyVG8S5guroNPzIF8SSwQRPHoqNS12qicoalATwmTgOUywGpQ81pB/C/MWJ1j3R\nuSfuow0oAtT713QWkQdaRRKcyw==\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://noticesapp.firebaseio.com"
});

//express
app.post('/user/create', function (req, res) {
	createUser(req.body.username, req.body.email, req.body.name, req.body.type, req.body.password, req.body.photo, res);
	
	// admin.auth().createUser({
	//   email: req.body.email,
	//   emailVerified: false,
	//   password: req.body.password,
	//   displayName: req.body.nickname, 
	//   photoURL: "http://i1.wp.com/www.techrepublic.com/bundles/techrepubliccore/images/icons/standard/icon-user-default.png",
	//   disabled: false
	// }).then(function(userRecord) {
	//     // See the UserRecord reference doc for the contents of userRecord.
	//     // res.status(200).send("Successfully created new user:" + userRecord.uid);
	//     // createUser("d1@tagcash.com", "r32fsd4f3", "Dondskie", "normal");
	//     res.status(200).send({status: "success"});
	// }).catch(function(error) {
	// 	res.status(403).send({errorMessage: error}); 
	// });
});

app.post('/user/update', function(req, res){
	admin.auth().updateUser(req.body.uid, {
	  email: req.body.email,
	  emailVerified: true,
	  password: req.body.password,
	  displayName: req.body.nickname,
	  photoURL: "http://www.example.com/12345678/photo.png",
	  disabled: false
	}).then(function(userRecord) {
	    // See the UserRecord reference doc for the contents of userRecord.
	    res.status(200).send("Successfully updated user " + JSON.stringify(userRecord.toJSON()));
  	}).catch(function(error) {
  		res.status(403).send("Error updating user: " + error);
	});
}); 

app.post('/user/delete', function(req, res){
	admin.auth().deleteUser(req.body.uid).then(function() {
		res.status(200).send("Successfully deleted user"); 
	  }).catch(function(error) {
	    res.status(403).send(error);
	  });
}); 

app.post('/user/login', function(req, res){ 
	var db = admin.database();
	var ref = db.ref("accounts/"+req.body.type+"/"+req.body.username);	 //admin or normal
	ref.once("value", function(snapshot) {
		var resp = snapshot.val();
		if (resp) {
			if (req.body.password == resp.password) {
			res.status(200).send(resp); 	
			} else {
				res.status(403).send({errorMessage: "Incorrect Password"}); 
			}	
		} else {
			res.status(403).send({errorMessage: "User not found"}); 
		}
		
	}, function (errorObject) {
		res.status(403).send(errorObject.code);  
	});
	
}); 


app.post('/fcm/register', function(req, res){
	registerFcm(req.body.username, req.body.type, req.body.token, res) 
}); 

//run server
var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});

function createNotice(sm, notice, u, d, t) { 
	var db = admin.database();
	var ref = db.ref("notices/admin");	
	// var usersRef = ref.child(accounts);
	ref.push().set({
	  short_message: sm,
	  message: notice,
	  user: u,
	  date: d,
	  title: t
	}); 
}

function createUser(uname, eadd, name, type, p, ph, res) {
	var db = admin.database();
	var ref = db.ref("accounts/"+type);	 //admin or normal
	var f = ref.child(uname);
	var object = {
		email: eadd,
	 	display_name: name,
	 	password: p,
	 	photoUrl: ph,
	 	username: uname
	 	}; 
 	f.once("value", function(snapshot) {
		var resp = snapshot.val();
		if (resp) {
			res.status(403).send({errorMessage: "Username not available, please think another and try again"});
		} else {
			f.set(object);
			res.status(200).send(object); 
		}
		
	}, function (errorObject) {
		res.status(403).send(errorObject.code);  
	});
 	// if (!f) {
 	// 	f.set(object); 
		// res.status(200).send(object); 	
 	// } else {
 	// 	res.status(403).send({errorMessage: "Username not available, please think another and try again"});
 	// }
	
}

function registerFcm(uname, type, t, res) {
	var db = admin.database();
	var ref = db.ref("accounts/"+type);	 //admin or normal
	var f = ref.child(uname);
	var object = {
		token: t
	 	}; 
	f.update(object); 
	res.status(200).send({status: "success"}); 
}

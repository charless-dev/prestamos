
function User (args) {
	this.email = args.email;
	this.password = args.password;
	this.role = args.role;
}

User.instances = {};

User.add = function (args) {
	var user = new User(args);
	User.instances[args.email] = user;
	console.log('Usuario' + args.email + 'ha sido creado!');
}

User.convertRow2Obj = function (userRow) {
	var user = new User(userRow);
	return user;
};

User.loadAll = function () {
	var key="", keys=[], usersString="", users={};  
	try {
		if (localStorage["users"]) {
			usersString = localStorage["users"];
		}
	} catch (e) {
		alert("Error when reading from Local Storage\n" + e);
	}
	if (usersString) {
		users = JSON.parse( usersString);
		keys = Object.keys( users);
		console.log( keys.length +" users loaded.");
		for (i=0; i < keys.length; i++) {
			key = keys[i];
			User.instances[key] = User.convertRow2Obj(users[key]);
		}
	}
};

User.update = function (args) {
  var user = User.instances[args.email];
  if (user.password !== args.password) { user.password = args.password;}
  if (user.role !== args.role) { user.role = args.year;}
  console.log("User " + args.email + " modified!");
};

User.destroy = function (email) {
	if (User.instances[email]) {
		console.log("User " + email + " deleted");
		delete User.instances[email];
	} else {
		console.log("There is no user with email " + email + " in the database!");
	}
};

User.saveAll = function () {
	var usersString="", error=false, nmrOfUsers = Object.keys( User.instances).length;  
	try {
		usersString = JSON.stringify( User.instances);
		localStorage["users"] = usersString;
	} catch (e) {
		alert("Error when writing to Local Storage\n" + e);
		error = true;
	}
	if (!error) console.log( nmrOfUsers + " books saved.");
};

User.createTestData = function () {
	User.instances["006251587X"] = new User({email:"006251587X", password:"8910", role:"Admin"});
	User.instances["0465026567"] = new User({email:"0465026567", password:"4567", role:"User"});
	User.instances["0465030793"] = new User({email:"0465030793", password:"1234", role:"User"});
	User.saveAll();
};

User.clearData = function () {
	if (confirm("Do you really want to delete all book data?")) {
		localStorage["users"] = "{}";
	}
};
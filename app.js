const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 3000;

// Ensure your data is defined or imported. Example:
// const data = require('./data'); // Make sure data is available for your routes

// ------------------------
// Middleware & View Engine
// ------------------------

// Parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from "public" and "uploads" folders
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set EJS as the template engine and define the views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ------------------------
// Routes
// ------------------------

// Home Page (renders main.ejs)
app.get("/", (req, res) => {
  res.render("main", { title: "Home - College Notes" });
});


// Upload Page
app.get("/upload", (req, res) => {
  res.render("upload", { title: "Upload - College Notes" });
});

// To-Do List Page
app.get("/todo", (req, res) => {
  res.render("todo", { title: "To-Do List - College Notes" });
});

// Courses Page
app.get("/courses", (req, res) => {
  res.render("courses", { title: "Courses - College Notes" });
});

//comp.ejs
app.get('/comp', (req, res) => {
  res.render('comp', { title: 'Computer Science' });
});

//code.ejs
app.get('/code', (req, res) => {
  res.render('code', { title: 'Programming' });
});

//aero.ejs
app.get('/aero', (req, res) => {
  res.render('aero', { title: 'Aerospace' });
});

//auto.ejs
app.get('/auto', (req, res) => {
  res.render('auto', { title: 'Automobile' });
});

//electrical.ejs
app.get('/electrical', (req, res) => {
  res.render('electrical', { title: 'Electrical' });
});

//electronics.ejs
app.get('/electronics', (req, res) => {
  res.render('electronics', { title: 'Electronics' });
});

//mech.ejs
app.get('/mechanical', (req, res) => {
  res.render('mechanical', { title: 'Mechanical' });
});

//robo.ejs
app.get('/robotics', (req, res) => {
  res.render('robotics', { title: 'Robotics' });
});

app.get("/search", (req, res) => {
  const query = req.query.query?.toLowerCase() || "";
  let results = [];

  // Loop through the data to find matches
  for (let branch in data) {
    for (let semester in data[branch]) {
      for (let subject in data[branch][semester]) {
        if (
          branch.toLowerCase().includes(query) ||
          semester.toLowerCase().includes(query) ||
          subject.toLowerCase().includes(query)
        ) {
          results.push({
            branch,
            semester,
            subject,
            link: data[branch][semester][subject]
          });
        }
      }
    }
  }

  res.render("search_results", { query, results, title: "Search Results" });
});



// Semester and subject data
const data = {
  Physics_Cycle: {
    "1st_semester": {
      "Engineering Mathematics-1": "https://drive.google.com/drive/folders/1rybBN-dL2BpvjroVkoOlHg4kiE8c2InT",
      "Engineering Physics": "https://drive.google.com/drive/folders/1cz6Zg7KnSNm3IdphKj7AN2dkTTyO__Tl",
      "Elements of Mechanical Engineering": "https://drive.google.com/drive/folders/1-U0VvMt5urFbsHWX76HtXJ0VzgY2TCyV",
      "Elements of Electrical Engineering": "https://drive.google.com/drive/folders/1QToYECZ-wP8-KOyYMEvCzWGNhwuNtZ7x",
      "Aerospace Engineering": "https://drive.google.com/drive/folders/1sxLlvmDGyjNU8hrKXtg4UmcQIJESCjno",
      "Professional Communication": "https://drive.google.com/drive/folders/1inbhgCFT36Q13UAdTOu9YawuHQhkWtay"
    },

    "2nd_semester": {
      "Engineering Mathematics-2": "https://drive.google.com/drive/folders/1bCWhDFvDIYbGKQbWe-55kqr51H02dIE9",
      "Engineering Physics": "https://drive.google.com/drive/folders/1cz6Zg7KnSNm3IdphKj7AN2dkTTyO__Tl",
      "Engineering Mechanics": "",
      "Elements of Electronics Engineering": "",
      "Engineering Drawing": "https://drive.google.com/drive/folders/1VTeBpIEuM6eegBXiZVbUQurBxK9J8dEM",
      "Constitution of India": ""
    }
  },

  Chemistry_Cycle: {

    "1st_sem": {
      "Engineering Mathematics-1": "https://drive.google.com/drive/folders/1rybBN-dL2BpvjroVkoOlHg4kiE8c2InT",
      "Engineering Chemistry": "https://drive.google.com/drive/folders/18YD7dwySWqK0TkMz9eFt2GiQva0l66uP",
      "Elements of Computer Science and Engineering": "https://drive.google.com/drive/folders/1gVL7FqiOEHhd_GPYnkPJqpOhy3MRPgAe",
      "Engineering Drawing": "https://drive.google.com/drive/folders/1VTeBpIEuM6eegBXiZVbUQurBxK9J8dEM",
      "Kannada": ""
    },

    "2nd_semester": {
      "Engineering Mathematics-2": "https://drive.google.com/drive/folders/1bCWhDFvDIYbGKQbWe-55kqr51H02dIE9",
      "Engineering Chemistry": "https://drive.google.com/drive/folders/18YD7dwySWqK0TkMz9eFt2GiQva0l66uP",
      "Elements of Mechanical Engineering": "https://drive.google.com/drive/folders/1-U0VvMt5urFbsHWX76HtXJ0VzgY2TCyV",
      "Elements of Electrical Engineering": "https://drive.google.com/drive/folders/1QToYECZ-wP8-KOyYMEvCzWGNhwuNtZ7x",
      "Elements of Computer Science and Engineering": "https://drive.google.com/drive/folders/1gVL7FqiOEHhd_GPYnkPJqpOhy3MRPgAe",
      "Professional Communication": ""
    }
  },

  Aerospace: {
    "3rd_semester": {
      "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
      "Materials Science for Engineers": "",
      "Elements of Aerospace Engineering": "",
      "Thermodynamics for Engineers": "",
      "Fluid Mechanics and Machines": "",
      "Indian Knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
    },
    "4th_semester": {
      "Engineering Mathematics-4": "",
      "Strength of Materials": "",
      "Manufacturing Processes for Aerospace Systems": "",
      "3D Modelling and Machine Drawing": "",
      "Aerodynamics-1": "",
      "Innovation and Entrepreneurship": ""
    },
    "5th_semester": {
      "Aerospace Structures": "https://drive.google.com/drive/folders/1XtX1uadh5HjaXqUc6DINQv47WEBQ5aH4",        "Control System":"https://drive.google.com/drive/folders/1gKPQFS9PxzCL-cRrP0ZE11S5nulZ9-P8",
      "Theory of Machines and Mechanisms": "https://drive.google.com/drive/folders/1sAhasyNvlZhX5A46k_ThJqCLu3yZg5n-",
      "Aerodynamics-2": "https://drive.google.com/drive/folders/1SMmqz6b7oAwRZSlSPlMG153xqfUHENLO",
      "Aerospace Propulsion-1": "https://drive.google.com/drive/folders/1_j9fPzj8yGYhn_R9MNM4pTTwZ7BNBU78",
      "Artificial Intelligence and Machine Learning": "https://drive.google.com/drive/folders/1ldcg67a5gONT2GuWDW6Ri1fV0LUzShz-"
    },
    "6th_semester": {
      "Aerospace Propulsion-2": "",
      "Finite Element Analysis": "",
      "Aircraft Performance, Stability and control": "",
      "Computational Fluid Dynamics": "",
      "Engineering Economics": ""
    },
    "7th_semester": {
      "Advanced Aerodynamics": "",
      "Rocket Propulsion": "",
      "Aerospace System Design": "",
      "Elective II": "",
      "Project Work I": ""
    },
    "8th_semester": {
      "Aircraft Maintenance Engineering": "",
      "Aerospace Manufacturing": "",
      "Elective III": "",
      "Project Work II": "",
      "Professional Ethics in Engineering": ""
    }
  },

  
  AIML: {
    "3rd_semester": {
      "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
      "Basics of Operating Systems": "https://drive.google.com/drive/folders/1N35qE_31Avq9_XUZ1QLCAU3vn6ZPSXJU",
      "Mathematics for Machine Learning 1": "",
      "Data Structures Foundation": "https://drive.google.com/drive/folders/11XGeuaaLTRGIP2yni_xa1NgA3c9TYoVO",
      "Programming Paradigm": "https://drive.google.com/drive/folders/1IGXq9muqNL_dAt5vMmwvcpB9OugcN6DC",
      "Logic Design": "https://drive.google.com/drive/folders/1MlLK8LfqutGG3awIeWn2lPzfyOKMHKB9",
      "Principles of Artificial Intelligence": "",
      "Indian Knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
    },
    "4th_semester": {
      "Engineering Mathematics-4": "",
      "Machine Learning-1": "",
      "Mathematics for Machine Learning-2": "",
      "Design and Analysis of Algorithms": "",
      "Programming Paradigms": "",
      "Environmental Studies": ""
    },
    "5th_semester": {
      "Microprocessors and Architecture": "https://drive.google.com/drive/folders/1kDNSZrsJIDix1Mxzpk9i9npZm4wJwWgX",
      "Machine Learning-2": "",
      "Data Mining": "",
      "Database Systems": "https://drive.google.com/drive/folders/15drLcOqVbfetwZUUitmUUpBiESi3m9oC",
      "Computer Networks": "https://drive.google.com/drive/folders/16X9SlDY7brWVnxBohwvgXCuDycFWJXVb"
    },
    "6th_semester": {
      "Graph Theory and Optimization": "",
      "Computer Vision": "",
      "Natural Language Processing": "",
      "Deep Learning and Applications": "",
      "Pattern Recognition": ""
    },
    "7th_semester": {
      "Advanced Machine Learning": "",
      "AI Ethics and Society": "",
      "Reinforcement Learning": "",
      "Elective II": "",
      "Project Work I": ""
    },
    "8th_semester": {
      "AI in Industry": "",
      "Capstone Project": "",
      "Elective III": "",
      "Project Work II": "",
      "Professional Ethics in Engineering": ""
    }
  },

  Automotive: {
    "3rd_semester": {
      "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
      "Materials Science for Engineers": "",
      "Elements of Automotive Systems and Autonomous Vehicle": "",
      "Thermodynamics for Engineers": "",
      "Fluid Mechanics and Machines": "",
      "Indian Knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
    },
    "4th_semester": {
      "Engineering Mathematics-4": "",
      "Strength of Materials": "",
      "Manufacturing Processes for Automotive Systems": "",
      "3D Modelling and Machine Drawing": "",
      "Automotive Electrical and Electronic Systems": "",
      "Innovation and Entrepreneurship": ""
    },
    "5th_semester": {
      "Propulsion Systems for Electric and Hybrid Vehicles": "",
      "Theory of Machines and Mechanisms": "",
      "Design of Automotive Components": "",
      "Automotive Noise, Vibration and Harshness": "",
      "Artificial Intelligence and Machine Learning": ""
    },
    "6th_semester": {
      "Vehicle Body Engineering and Crashworthiness": "",
      "Finite Element Analysis": "",
      "Vehicle Dynamics and Handling": "",
      "Computational Intelligence in Automotive Applications": "",
      "Engineering Economics": ""
    },
    "7th_semester": {
      "Advanced Automotive Systems": "",
      "Automotive Control Systems": "",
      "Elective II": "",
      "Project Work I": ""
    },
    "8th_semester": {
      "Automotive Industry Practices": "",
      "Capstone Project": "",
      "Elective III": "",
      "Project Work II": "",
      "Professional Ethics in Engineering": ""
    }
  },
  
  Computer_Science: {
    "3rd_semester": {
      "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
      "Discrete Mathematics": "https://drive.google.com/drive/folders/1LpZ9UJbRfYifZzI2VUE9HgZYVdayfOpY",
      "Data Structures Foundation": "https://drive.google.com/drive/folders/11XGeuaaLTRGIP2yni_xa1NgA3c9TYoVO",
      "Logic Design": "https://drive.google.com/drive/folders/1MlLK8LfqutGG3awIeWn2lPzfyOKMHKB9",
      "Programming Paradigm": "https://drive.google.com/drive/folders/1IGXq9muqNL_dAt5vMmwvcpB9OugcN6DC",
      "Indian Knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
    },
    "4th_semester": {
      "Engineering Mathematics-4": "",
      "Design and Analysis of Algorithms": "",
      "Advanced Data Structures": "",
      "Software Development Fundamentals": "",
      "Programming Paradigms": "",
      "Formal Languages and Automata Theory": "",
      "Environmental Studies": ""
    },
    "5th_semester": {
      "Data Mining": "",
      "Probability and Statistics": "https://drive.google.com/drive/folders/1BrdmJMQCN_B88A-lr53mHLiCcCzW42mV",
      "Database Systems": "https://drive.google.com/drive/folders/15drLcOqVbfetwZUUitmUUpBiESi3m9oC",
      "Computer Networks": "https://drive.google.com/drive/folders/16X9SlDY7brWVnxBohwvgXCuDycFWJXVb",
      "Operating Systems": "https://drive.google.com/drive/folders/1N35qE_31Avq9_XUZ1QLCAU3vn6ZPSXJU",
      "Compilers": ""
    },
    "6th_semester": {
      "Information Security and Protection": "",
      "Web Architecture and Application Development": "",
      "Principles of Artificial Intelligence": "",
      "Computer Graphics": ""
    },
    "7th_semester": {
      "Software Engineering": "",
      "Cloud Computing": "",
      "Elective II": "",
      "Project Work I": ""
    },
    "8th_semester": {
      "Capstone Project": "",
      "Elective III": "",
      "Project Work II": "",
      "Professional Ethics in Engineering": ""
    }
  },



  Electrical: {
    "3rd_semester": {
      "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
      "Signals and Systems": "",
      "Network Analysis": "",
      "Electrical Machines-1": "",
      "Electronic Circuits": "",
      "Digital Logic Design": "",
      "Indian Knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
    },
    "4th_semester": {
      "Engineering Mathematics-4": "",
      "Linear Integrated Circuits": "",
      "Electromagnetic Theory": "",
      "Microprocessors and Microcontrollers": "",
      "Measurement and Instrumentation": "",
      "Electrical Machines-2": "",
      "Innovation and Entrepreneurship": ""
    },
    "5th_semester": {
      "Digital Signal Processing": "",
      "Electrical Machine Design": "",
      "Control Systems": "",
      "Transmission and Distribution": "",
      "Engineering Economics": ""
    },
    "6th_semester": {
      "Power Electronics and Drives": "",
      "Power System Analysis": "",
      "Switchgear and Protection": "",
      "High Voltage Engineering": "",
      "Renewable Energy Systems": ""
    },
    "7th_semester": {
      "Advanced Control Systems": "",
      "Smart Grid Technology": "",
      "Elective II": "",
      "Project Work I": ""
    },
    "8th_semester": {
      "Capstone Project": "",
      "Elective III": "",
      "Project Work II": "",
      "Professional Ethics in Engineering": ""
    }
  },
  
  Electronics: {
    "3rd_semester": {
      "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
      "Signals and Systems": "https://drive.google.com/drive/folders/1LF43iPbZcIP9N-ZmwP76oOAEk0b7fr2A",
      "Network Analysis and Synthesis": "https://drive.google.com/drive/folders/1q_7LM3rfKfMROh8YZ5WxJ4VJUJVFEbNg",
      "Electronic Circuits": "https://drive.google.com/drive/folders/1SnAbNDdM-PtNAEiIcQuNyXnIhwOhIXvJ",
      "Very Large scale Integration":"https://drive.google.com/drive/folders/1YSQLFSdgVT5XbY_iFYGmvUI-rtXsT_Ai",
      "Digital Login and design":"https://drive.google.com/drive/folders/1z3Uf8TwxrBFMQ-0fIcCvkpQcUIhwSOtH",
      "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
    },
    "4th_semester": {
      "Engineering Mathematics-4": "",
      "Linear Integrated Circuits": "",
      "Electromagnetic Fields": "",
      "Signal Processing": "",
      "Control Systems": "",
      "Embedded Systems": ""
    },
    "5th_semester": {
      "Digital Signal Processing": "",
      "VLSI Design": "",
      "Microcontrollers": "",
      "Communication Networks": "",
      "Engineering Economics": ""
    },
    "6th_semester": {
      "RF and Microwave Engineering": "",
      "Optoelectronics": "",
      "Power Electronics": "",
      "Embedded System Design": "",
      "Renewable Energy Technologies": ""
    },
    "7th_semester": {
      "Advanced Communication Systems": "",
      "Elective II": "",
      "Project Work I": ""
    },
    "8th_semester": {
      "Capstone Project": "",
      "Elective III": "",
      "Project Work II": "",
      "Professional Ethics in Engineering": ""
    }
  },

  Information_science: {
    "3rd_semester": {
      "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
      "Discrete Mathematics": "https://drive.google.com/drive/folders/1LpZ9UJbRfYifZzI2VUE9HgZYVdayfOpY",
      "Data Structures Foundation": "https://drive.google.com/drive/folders/11XGeuaaLTRGIP2yni_xa1NgA3c9TYoVO",
      "Logic Design": "https://drive.google.com/drive/folders/1MlLK8LfqutGG3awIeWn2lPzfyOKMHKB9",
      "Programming Paradigm": "https://drive.google.com/drive/folders/1IGXq9muqNL_dAt5vMmwvcpB9OugcN6DC",
      "Elements of Information Science": "",
      "Indian Knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
    },
    "4th_semester": {
      "Engineering Mathematics-4": "",
      "Design and Analysis of Algorithms": "",
      "Database Management Systems": "",
      "Computer Networks": "",
      "Operating Systems": "",
      "Environmental Studies": ""
    },
    "5th_semester": {
      "Data Mining": "",
      "Probability and Statistics": "https://drive.google.com/drive/folders/1BrdmJMQCN_B88A-lr53mHLiCcCzW42mV",
      "Database Systems": "https://drive.google.com/drive/folders/15drLcOqVbfetwZUUitmUUpBiESi3m9oC",
      "Computer Networks": "https://drive.google.com/drive/folders/16X9SlDY7brWVnxBohwvgXCuDycFWJXVb",
      "Operating Systems": "https://drive.google.com/drive/folders/1N35qE_31Avq9_XUZ1QLCAU3vn6ZPSXJU",
      "Microprocessors and Architecture": "https://drive.google.com/drive/folders/1kDNSZrsJIDix1Mxzpk9i9npZm4wJwWgX",
      "Bio-informatics": ""
    },
    "6th_semester": {
      "Information Security and Protection": "",
      "Web Architecture and Application Development": "",
      "Principles of Artificial Intelligence": "",
      "Data Processing": ""
    },
    "7th_semester": {
      "Software Engineering": "",
      "Cloud Computing": "",
      "Elective II": "",
      "Project Work I": ""
    },
    "8th_semester": {
      "Capstone Project": "",
      "Elective III": "",
      "Project Work II": "",
      "Professional Ethics in Engineering": ""
    }
  },
  Mathematics_and_Computing: {
    "3rd_semester": {
      "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
      "Probability and Statistics": "",
      "Discrete Mathematics": "https://drive.google.com/drive/folders/1LpZ9UJbRfYifZzI2VUE9HgZYVdayfOpY",
      "Data Structures Foundation": "https://drive.google.com/drive/folders/11XGeuaaLTRGIP2yni_xa1NgA3c9TYoVO",
      "Programming Paradigm": "https://drive.google.com/drive/folders/1IGXq9muqNL_dAt5vMmwvcpB9OugcN6DC",
      "Logic Design": "https://drive.google.com/drive/folders/1MlLK8LfqutGG3awIeWn2lPzfyOKMHKB9",
      "Indian Knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
    },
    "4th_semester": {
      "Engineering Mathematics-4": "",
      "Inferential Statistics": "",
      "Integral Transforms": "",
      "Linear Algebra": "",
      "Design and Analysis of Algorithms": "",
      "Formal Languages and Automata Theory": "",
      "Programming Paradigms": "",
      "Environmental Studies": ""
    },
    "5th_semester": {
      "Optimization Techniques": "",
      "Partial Differential Equations": "",
      "Applications of Probability and Statistics in Finance": "",
      "Computer Networks": "https://drive.google.com/drive/folders/16X9SlDY7brWVnxBohwvgXCuDycFWJXVb",
      "Microprocessors and Architecture": "https://drive.google.com/drive/folders/1kDNSZrsJIDix1Mxzpk9i9npZm4wJwWgX",
      "Principles of Artificial Intelligence": ""
    },
    "6th_semester": {
      "Graph Theory and Optimization": "",
      "Information Security and Protection": "",
      "Quantum Computing": "",
      "Machine Learning-1": "",
      "Parallel Algorithms for Scientific Computing": ""
    },
    "7th_semester": {
      "Capstone Project": "",
      "Elective II": "",
      "Internship": ""
    },
    "8th_semester": {
      "Professional Ethics in Computing": "",
      "Emerging Technologies in Mathematics": "",
      "Project Work": ""
    }
  },

Mechanical: {
  "3rd_semester": {
    "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
    "Materials Science": "",
    "Engineering Thermodynamics": "",
    "Fluid Mechanics": "",
    "Manufacturing Processes": "",
    "Machine Drawing": "",
    "Mechanical Dissection": "",
    "Indian Knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
  },
  "4th_semester": {
    "Engineering Mathematics-4": "",
    "Fluid Machines": "",
    "Conventional Machining Processes": "",
    "Strength of Materials": "",
    "Thermal Engineering": "",
    "Machine Design": ""
  },
  "5th_semester": {
    "Applied Thermodynamics": "",
    "Dynamics of Machinery": "",
    "Design of Machine Elements-1": "",
    "Automation in Manufacturing": "",
    "Elective I": ""
  },
  "6th_semester": {
    "Heat and Mass Transfer": "",
    "Design of Machine Elements-2": "",
    "Industrial Engineering and Management": "",
    "Engineering Economics and Cost Estimation for Mechanical": "",
    "Elective II": ""
  },
  "7th_semester": {
    "Advanced Manufacturing Processes": "",
    "Robotics and Automation": "",
    "Elective III": "",
    "Project Work I": ""
  },
  "8th_semester": {
    "Capstone Project": "",
    "Professional Ethics in Engineering": "",
    "Project Work II": ""
  }
},
Robotics: {
  "3rd_semester": {
    "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
    "Strength of Materials": "",
    "Measurements, Data Acquisition and Processing": "",
    "Introduction to Robotics and Mechatronics": "",
    "Electrical Machines, Drives and Actuators": "",
    "Machine Drawing": "",
    "Indian Knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
  },
  "4th_semester": {
    "Engineering Mathematics-4": "",
    "Analog and Digital Electronics": "",
    "Artificial Intelligence for Robotics": "",
    "Digital Signal Processing": "",
    "Fluid Power Systems for Robots": "",
    "Mechanical Dissection": ""
  },
  "5th_semester": {
    "Robotic Kinematics": "",
    "Robotic Dynamics": "",
    "Control Systems for Robotics": "",
    "Elective I": ""
  },
  "6th_semester": {
    "Robot Programming and Simulation": "",
    "Robotic System Design": "",
    "Applied Control Systems": "",
    "Robot Motion Planning": "",
    "Digital Image Processing": "",
    "Engineering Economics and Cost Estimation": ""
  },
  "7th_semester": {
    "Advanced Robotics": "",
    "Elective II": "",
    "Project Work I": ""
  },
  "8th_semester": {
    "Capstone Project": "",
    "Elective III": "",
    "Project Work II": "",
    "Professional Ethics in Engineering": ""
  }
},    
  
};

// 📌 **Step 1: Show available branches (semester.ejs)**
app.get("/semester", (req, res) => {
  const branches = Object.keys(data); // Extract branches dynamically
  res.render("semester", { title: "Select Your Branch", branches });
});

// 📌 **Step 2: Show available semesters for a selected branch (index.ejs)**
app.get("/branch/:branch", (req, res) => {
  const branch = req.params.branch;
  const semesters = data[branch] ? Object.keys(data[branch]) : null;

  if (!semesters) return res.status(404).send("Branch not found");

  res.render("index", { title: `Select Semester - ${branch}`, branch, semesters });
});

// 📌 **Step 3: Show available subjects for the selected semester & branch (subjects.ejs)**
app.get("/semester/:branch/:sem", (req, res) => {
  const { branch, sem } = req.params;
  const subjects = data[branch] && data[branch][sem] ? Object.keys(data[branch][sem]) : null;

  if (!subjects) return res.status(404).send("Semester not found");

  res.render("subjects", { 
    title: `Subjects - ${sem.replace('_', ' ')} - ${branch}`, 
    branch, 
    sem, 
    subjects 
  });
});

// 📌 **Step 4: Redirect to the subject notes link**
app.get("/subject/:branch/:sem/:subject", (req, res) => {
  const { branch, sem, subject } = req.params;
  const subjectLink = data[branch]?.[sem]?.[subject];

  if (!subjectLink) return res.status(404).send("Subject notes not found");

  res.redirect(subjectLink);
});




// ------------------------
// Multer Configuration for Uploads
// ------------------------

// Define allowed MIME types and file extensions
const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
];
const allowedExtensions = /pdf|doc|docx|ppt|pptx/;

// Ensure temp_uploads folder exists
const tempDir = path.join(__dirname, "temp_uploads");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Define multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Define file filter function
const fileFilter = (req, file, cb) => {
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetypeAllowed = allowedMimeTypes.includes(file.mimetype);
  if (extname && mimetypeAllowed) {
    return cb(null, true);
  } else {
    return cb(new Error("Error: File type not supported!"));
  }
};

// Initialize multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

// Upload Route
app.post("/upload", upload.single("note"), (req, res) => {
  if (!req.file) {
    return res.send("Error: No file uploaded.");
  }

  const { semester, branch, subject } = req.body;
  if (!semester || !branch || !subject) {
    return res.send("Error: Missing semester, branch, or subject.");
  }

  const targetDir = path.join(__dirname, "uploads", semester, branch, subject);
  fs.mkdirSync(targetDir, { recursive: true });
  const targetPath = path.join(targetDir, req.file.filename);

  fs.rename(req.file.path, targetPath, (err) => {
    if (err) {
      return res.send("Error moving file.");
    }
    const fileUrl = `/uploads/${encodeURIComponent(semester)}/${encodeURIComponent(branch)}/${encodeURIComponent(subject)}/${encodeURIComponent(req.file.filename)}`;
    res.send(`File uploaded successfully: <a href="${fileUrl}" target="_blank">View File</a>`);
  });
});

// ------------------------
// Start the Server
// ------------------------
app.listen(PORT, "0.0.0.0", () => {  // Bind to 0.0.0.0
  console.log(`Server is running on port ${PORT}`);
});
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// Increase timeout settings
server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;

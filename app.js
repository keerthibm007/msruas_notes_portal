const express = require("express");
const path = require("path");
const app = express();
const http = require('http');
const fs = require('fs');
const multer = require("multer");

const PORT = 3000;

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.render("main", { title: "Home - College Notes" })); // Home Page
app.get("/index", (req, res) => res.render("index", { title: "Notes - College Notes" })); // Notes Page
app.get("/upload", (req, res) => res.render("upload", { title: "Upload - College Notes" })); // Upload Page
app.get("/todo", (req, res) => res.render("todo", { title: "To-Do List - College Notes" })); // To-Do List Page
app.get("/course", (req, res) => res.render("course", { title: "Courses - College Notes" })); // Courses Page


// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
// Search route
app.get('/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  let results = [];

  // Loop through the data to find matches
  for (let sem in data) {
      for (let branch in data[sem]) {
          for (let subject in data[sem][branch]) {
              if (subject.toLowerCase().includes(query) || branch.toLowerCase().includes(query)) {
                  results.push({
                      sem,
                      branch,
                      subject,
                      link: data[sem][branch][subject]
                  });
              }
          }
      }
  }

  // Render search results
  res.render('search_results', { query, results });
});

//search - index.ejs
app.get("/", (req, res) => {
  res.render("main"); // Rendering main.ejs
});


app.get("/index", (req, res) => {
  res.render("index"); // If you still use index.ejs somewhere
});
// Semester and subject data
const data = {
    "1st_sem": {
      Physics: {
        "Engineering Mathematics-1": "https://drive.google.com/drive/folders/1rybBN-dL2BpvjroVkoOlHg4kiE8c2InT",
        "Engineering Physics": "https://drive.google.com/drive/folders/1cz6Zg7KnSNm3IdphKj7AN2dkTTyO__Tl",
        "Elements of Mechanical Engineering": "https://drive.google.com/drive/folders/1-U0VvMt5urFbsHWX76HtXJ0VzgY2TCyV",
        "Elements of Electrical Engineering": "https://drive.google.com/drive/folders/1QToYECZ-wP8-KOyYMEvCzWGNhwuNtZ7x",
        "Aerospace Engineering":"https://drive.google.com/drive/folders/1sxLlvmDGyjNU8hrKXtg4UmcQIJESCjno",
        "Professional Communication":"https://drive.google.com/drive/folders/1inbhgCFT36Q13UAdTOu9YawuHQhkWtay"
      },
      Chemistry: {
        "Engineering Mathematics-1": "https://drive.google.com/drive/folders/1rybBN-dL2BpvjroVkoOlHg4kiE8c2InT",
        "Engineering Chemistry": "https://drive.google.com/drive/folders/18YD7dwySWqK0TkMz9eFt2GiQva0l66uP",
        "Elements of Computer Science and Engineering": "https://drive.google.com/drive/folders/1gVL7FqiOEHhd_GPYnkPJqpOhy3MRPgAe",
        "Engineering Drawing": "https://drive.google.com/drive/folders/1VTeBpIEuM6eegBXiZVbUQurBxK9J8dEM",
        "Kannada": "",
      }
    },
  
    "2nd_sem": {
      Physics: {
        "Engineering Mathematics-2": "https://drive.google.com/drive/folders/1bCWhDFvDIYbGKQbWe-55kqr51H02dIE9",
        "Engineering Physics": "https://drive.google.com/drive/folders/1cz6Zg7KnSNm3IdphKj7AN2dkTTyO__Tl",
        "Engineering Mechanics": "",
        "Elements of Electronics Engineering": "",
        "Engineering Drawing": "https://drive.google.com/drive/folders/1VTeBpIEuM6eegBXiZVbUQurBxK9J8dEM",
        "Constitution of India": "",
      },
      Chemistry: {
        "Engineering Mathematics-2": "https://drive.google.com/drive/folders/1bCWhDFvDIYbGKQbWe-55kqr51H02dIE9",
        "Engineering Chemistry": "https://drive.google.com/drive/folders/18YD7dwySWqK0TkMz9eFt2GiQva0l66uP",
        "Elements of Mechanical Engineering": "https://drive.google.com/drive/folders/1-U0VvMt5urFbsHWX76HtXJ0VzgY2TCyV",
        "Elements of Electrical Engineering": "https://drive.google.com/drive/folders/1QToYECZ-wP8-KOyYMEvCzWGNhwuNtZ7x",
        "Elements of Computer Science and Engineering": "https://drive.google.com/drive/folders/1gVL7FqiOEHhd_GPYnkPJqpOhy3MRPgAe",
        "Professional Communication": "",
      }
    },
  
    "3rd_sem": {
      Aerospace: {
        "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
        "Materials Science for Engineers": "",
        "Elements of Aerospace Engineering": "",
        "Thermodynamics for Engineers": "",
        "Fluid Mechanics and Machines": "",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
      },
      AIML: {
        "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
        "Basics of Operating Systems": "https://drive.google.com/drive/folders/1N35qE_31Avq9_XUZ1QLCAU3vn6ZPSXJU",
        "Mathematics for Machine Learning 1": "",
        "Data Structures Foundation": "https://drive.google.com/drive/folders/11XGeuaaLTRGIP2yni_xa1NgA3c9TYoVO",
        "Programming Paradigm":"https://drive.google.com/drive/folders/1IGXq9muqNL_dAt5vMmwvcpB9OugcN6DC",
        "Logic Design": "https://drive.google.com/drive/folders/1MlLK8LfqutGG3awIeWn2lPzfyOKMHKB9",
        "Principles of Artificial Intelligence": "",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
       
      },
      Automotive: {
        "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
        "Materials Science for Engineers": "",
        "Elements of Automotive Systems and Autonomous Vehicle": "",
        "Thermodynamics for Engineers": "",
        "Fluid Mechanics and Machines": "",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
      },
      Computer_science: {
        "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
        "Discrete Mathematics": "https://drive.google.com/drive/folders/1LpZ9UJbRfYifZzI2VUE9HgZYVdayfOpY",
        "Data Structures Foundation": "https://drive.google.com/drive/folders/11XGeuaaLTRGIP2yni_xa1NgA3c9TYoVO",
        "Logic Design": "https://drive.google.com/drive/folders/1MlLK8LfqutGG3awIeWn2lPzfyOKMHKB9",
        "Programming Paradigm":"https://drive.google.com/drive/folders/1IGXq9muqNL_dAt5vMmwvcpB9OugcN6DC",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
      },
      Electrical: {
        "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
        "Signals and Systems": "",
        "Network Analysis": "",
        "Electrical Machines-1": "",
        "Electronic Circuits": "",
        "Digital Login Design":"",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
      },
      Electronics: {
        "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
        "Signals and Systems": "https://drive.google.com/drive/folders/1LF43iPbZcIP9N-ZmwP76oOAEk0b7fr2A",
        "Network Analysis and Synthesis": "https://drive.google.com/drive/folders/1q_7LM3rfKfMROh8YZ5WxJ4VJUJVFEbNg",
        "Electronic Circuits": "https://drive.google.com/drive/folders/1SnAbNDdM-PtNAEiIcQuNyXnIhwOhIXvJ",
        "Very Large scale Integration":"https://drive.google.com/drive/folders/1YSQLFSdgVT5XbY_iFYGmvUI-rtXsT_Ai",
        "Digital Login and design":"https://drive.google.com/drive/folders/1z3Uf8TwxrBFMQ-0fIcCvkpQcUIhwSOtH",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
      },
      
      Information_science: {
        "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
        "Discrete Mathematics": "https://drive.google.com/drive/folders/1LpZ9UJbRfYifZzI2VUE9HgZYVdayfOpY",
        "Data Structures Foundation": "https://drive.google.com/drive/folders/11XGeuaaLTRGIP2yni_xa1NgA3c9TYoVO",
        "Logic Design": "https://drive.google.com/drive/folders/1MlLK8LfqutGG3awIeWn2lPzfyOKMHKB9",
        "Programming Paradigm":"https://drive.google.com/drive/folders/1IGXq9muqNL_dAt5vMmwvcpB9OugcN6DC",
        "Elements of Information Science": "",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
      },
      Mathematics_and_Computing: {
        "Complex Analysis and Vector calculus": "",
        "Probability and Statistics":"",
        "Discrete Mathematics": "https://drive.google.com/drive/folders/1LpZ9UJbRfYifZzI2VUE9HgZYVdayfOpY",
        "Data Structures Foundation": "https://drive.google.com/drive/folders/11XGeuaaLTRGIP2yni_xa1NgA3c9TYoVO",
        "Programming Paradigm":"https://drive.google.com/drive/folders/1IGXq9muqNL_dAt5vMmwvcpB9OugcN6DC",
        "Logic Design": "https://drive.google.com/drive/folders/1MlLK8LfqutGG3awIeWn2lPzfyOKMHKB9",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
      },
      Mechanical: {
        "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
        "Materials Science": "",
        "Engineering Thermodynamics": "",
        "Fluid Mechanics": "",
        "Manufacturing Processes": "",
        "Machine Drawing":"",
        "Mechanical Dissection":"",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
      },
      Robotics: {
        "Engineering Mathematics-3": "https://drive.google.com/drive/folders/1-UyJ-iRxfvqm_KXL2ciw0IHOjgsYZ6X_",
        "Strength of Materials":"",
        "Measurements, Data Acquisition and Processing":"",
        "Introduction to Robotics and Mechatronics": "",
        "Electrical Machines Drives and Actuators": "",
        "Machine Drawing": "",
        "Indian knowledge System": "https://drive.google.com/drive/folders/1jTv-yYKgUeZ2Yfr7uQBUoolv6FKEoyXR"
      }
    },
  
    "4th_sem": {
      Aerospace: {
        "Engineering Mathematics-4": "",
        "Strength of Materials": "",
        "Manufacturing Processes for Aerospace Systems": "",
        "3D Modelling and Machine Drawing": "",
        "Aerodynamics-1": "",
        "Innovation and Entrepreneurship": ""
      },
      AIML: {
        "Engineering Mathematics-4": "",
        "Machine Learning-1": "",
        "Mathematics for Machine Learning-2": "",
        "Design and Analysis of Algorithms": "",
        "Programming Paradigms": "",
        "Environmental Studies": ""
      },
      Automotive: {
        "Engineering Mathematics-4": "",
        "Strength of Materials": "",
        "Manufacturing Processes for Automotive Systems": "",
        "3D Modelling and Machine Drawing": "",
        "Automotive Electrical and Electronic Systems": "",
        "Innovation and Entrepreneurship": ""
      },
      Civil: {
        "Engineering Mathematics-4": "",
        "Transportation Engineering-1": "",
        "Structural Analysis-1": "",
        "Hydraulics and Hydraulic Machines": "",
        "Environmental Engineering": "",
        "Buiding Planning and Computer Aided Drafting":"",
        "Innovation and Entrepreneurship": ""
      },
      Computer_science: {
        "Engineering Mathematics-4": "",
        "Design and Analysis of Algorithms": "",
        "Advanced Data Structures": "",
        "Software Development Fundamentals": "",
        "Programming Paradigms": "",
        "Formal Languages and Automata Theory":"",
        "Environmental Studies": ""
      },
      Electrical: {
        "Engineering Mathematics-4": "",
        "Linear Integrated circits": "",
        "Electromagnetic Theory": "",
        "Microprocessors and Microcontrollers": "",
        "Measurement and Instrumentation": "",
        "Electrical Machines-2":"",
        "Innovation and Entrepreneurship": ""
      },
      Electronics: {
        "Engineering Mathematics-4": "",
        "Linear Integrated circits": "",
        "Electromagnetic Theory": "",
        "Microprocessors and Microcontrollers": "",
        "Measurement and Instrumentation": "",
        "Innovation and Entrepreneurship": ""
      },
      Information_science: {
        "Engineering Mathematics-4": "",
        "Design and Analysis of Algorithms": "",
        "Database Management Systems": "",
        "Computer Networks": "",
        "Operating Systems": "",
        "Environmental Studies": ""
      },
      
      Mathematics_and_Computing: {
        "Inferential Statistics":"",
        "Integral Transforms":"",
        "Linear Algebra":"",
        "Design and Analysis of Algorithms":"",
        "Formal Languages and Automata Theory":"",
        "Programming Paradigms": "",
        "Environmental Studies": ""
      },

      Mechanical: {
        "Engineering Mathematics-4": "",
        "Fluid Machines": "",
        "Conventional Machining Processses": "",
        "Strength of Materials": ""
      },
      Robotics: {
        "Engineering Mathematics-4": "",
        "Analog and Digital Electronics": "",
        "Artificial Intelligence for Robotics": "",
        "Digital Signal Processing": "",
        "Fluid Power Systems for Robots": "",
        "Mechanical Dissection": ""
      }
    },

    "5th_sem": {
      Aerospace: {
        "Aerospace Structures": "https://drive.google.com/drive/folders/1XtX1uadh5HjaXqUc6DINQv47WEBQ5aH4",
        "Control System":"https://drive.google.com/drive/folders/1gKPQFS9PxzCL-cRrP0ZE11S5nulZ9-P8",
        "Theory of Machines and Mechanisms": "https://drive.google.com/drive/folders/1sAhasyNvlZhX5A46k_ThJqCLu3yZg5n-",
        "Aerodynamics-2": "https://drive.google.com/drive/folders/1SMmqz6b7oAwRZSlSPlMG153xqfUHENLO",
        "Aerospace Propulsion-1": "https://drive.google.com/drive/folders/1_j9fPzj8yGYhn_R9MNM4pTTwZ7BNBU78",
        "Artificial Intelligence and Machine Learning": "https://drive.google.com/drive/folders/1ldcg67a5gONT2GuWDW6Ri1fV0LUzShz-"
      },
      AIML: {
        "Microprocessors and Architecture": "https://drive.google.com/drive/folders/1kDNSZrsJIDix1Mxzpk9i9npZm4wJwWgX",
        "Machine Learning-2": "",
        "Data Mining": "",
        "Database Systems": "https://drive.google.com/drive/folders/15drLcOqVbfetwZUUitmUUpBiESi3m9oC",
        "Computer Networks": "https://drive.google.com/drive/folders/16X9SlDY7brWVnxBohwvgXCuDycFWJXVb",
      },
      Automotive: {
        "propulsion Systems for Electric and Hybrid vehicle": "",
        "Theory of Machines and Mechanisms": "",
        "Design of Automotive Components": "",
        "Automotive Noise, Vibration and harshness": "",
        "Artificial Intelligence and Machine Learning": ""
      },
      Computer_Science: {
        "Data Mining": "",
        "Probability and Statistics": "https://drive.google.com/drive/folders/1BrdmJMQCN_B88A-lr53mHLiCcCzW42mV",
        "Database Systems": "https://drive.google.com/drive/folders/15drLcOqVbfetwZUUitmUUpBiESi3m9oC",
        "Computer Networks": "https://drive.google.com/drive/folders/16X9SlDY7brWVnxBohwvgXCuDycFWJXVb",
        "Operating Systems": "https://drive.google.com/drive/folders/1N35qE_31Avq9_XUZ1QLCAU3vn6ZPSXJU",
        "Compilers":""
      },
      Electronics: {
        "Transmission and Distribution": "",
        "Digital Signal Processing": "",
        "Electrical Machine Design": "",
        "Control Systems": "",
        "Engineering Economics": ""
      },
      Electrical_and_Electronics:{
        "Digital Signal Processing": "https://drive.google.com/drive/folders/1_BDgrxVfDBbby6tn0HpbC3yFLmiUaCPt",
        "Electrical Machine Design": "https://drive.google.com/drive/folders/1o3uD0OPoxYTnFC4ee1M4yBeZwf1aEgtL",
        "Control Systems": "https://drive.google.com/drive/folders/1nJnvklUnWZa6LSct0AxVe27CQBdDyuga",
        "Transmission and Distribution": "https://drive.google.com/drive/folders/1JI_MYB2yeurNyhny2QyH6d3gHcEHNO6o",
        "High Voltage":"https://drive.google.com/drive/folders/1yqxrOkkoWGowPLMFXCY7obRfAk7PGwqH",
        "Engineering Economics": "https://drive.google.com/drive/folders/1H9i5jZR8lswL0vm2XIloHxfS41fSWBsS"
      },
      Information_science: {
        "Data Mining": "",
        "Probability and Statistics": "https://drive.google.com/drive/folders/1BrdmJMQCN_B88A-lr53mHLiCcCzW42mV",
        "Database Systems": "https://drive.google.com/drive/folders/15drLcOqVbfetwZUUitmUUpBiESi3m9oC",
        "Computer Networks": "https://drive.google.com/drive/folders/16X9SlDY7brWVnxBohwvgXCuDycFWJXVb",
        "Operating Systems": "https://drive.google.com/drive/folders/1N35qE_31Avq9_XUZ1QLCAU3vn6ZPSXJU",
        "Microprocessors and Architecture": "https://drive.google.com/drive/folders/1kDNSZrsJIDix1Mxzpk9i9npZm4wJwWgX",
        "Bio-informatics":""
      },
      Mathematics_and_Computing: {
        "Optimization Techniques":"",
        "Partial Differential Equations":"",
        "Applications of Probability and statistics in Finance":"",
        "Computer Networks":"https://drive.google.com/drive/folders/16X9SlDY7brWVnxBohwvgXCuDycFWJXVb",
        "Microprocessors and Architecture":"https://drive.google.com/drive/folders/1kDNSZrsJIDix1Mxzpk9i9npZm4wJwWgX",
        "Principles of Artificial Intelligence":""
      },
      Mechanical: {
        "Applied Thermodynamics": "",
        "Dynamics of Machinery": "",
        "Design of Machine Elements-1": "",
        "Automation in Manufacturing": "",
      },
      Robotics: {
        "Designs of Machine Elements": "",
        "Embedded Processor and Controllers": "",
        "Computer Vision": "",
        "Control System": ""
      }
    },

    "6th_sem": {
      Aerospace: {
        "Aerospace Propulsion-2": "",
        "Finite Element Analysis": "",
        "Aircraft Performance, Stability and control": "",
        "Computational Fluid Dynamics": "",
        "Engineering Economics": ""
      },
      AIML: {
        "Graph Theory and Optimization": "",
        "Computer Vision": "",
        "Natural Language Processing": "",
        "Deep Learning and Applications": "",
        "Pattern Recognition": ""
      },
      Automotive: {
        "Vehicle Body Engineering and Crashworthiness": "",
        "Finite Element Analysis": "",
        "Vehicle Dynamics and Handling": "",
        "Computational Intelligence in Automotive Applications": "",
        "Engineering Economics": ""
      },
      Civil: {
        "Geotechnical Engineering-2": "",
        "Design of Steel Element": "",
        "Estimation-costing and Engineering Economics": "",
        "DSM & Finite Element Analysis": "",
        "Design & Drawing of Transportation & Irrigation Structures": "",
        "Design & Drawing of Geotechnical & Environmental Structures": "",
        "Design and Drawing of Steel Structures":""
      },
      Computer_science: {
        "Information security and Protection": "",
        "Web Architecture and Application Development": "",
        "Principles of Artificial Intelligence": "",
        "Computer Graphics": ""
      },
      Electrical_and_Electronics: {
        "Design and Computer Aided of Electrical Machine": "",
        "Switchgear and Protection": "",
        "Power Electronics and Drives": "",
        "Power System Analysis": ""
      },
      Electronics_and_Communication: {
        "Information Theory": "",
        "Digital Communication": "",
        "Antenna and Propagation": "",
        "Computer Networks": ""
      },
      Information_science: {
        "Information security and Protection": "",
        "Web Architecture and Application Development": "",
        "Principles of Artificial Intelligence": "",
        "Data Processing": ""
      },
      Mathematics_and_Computing: {
        "Graph Theory and Optimization": "",
        "Information security and Protection": "",
        "Quantum Computing": "",
        "Machine Learning-1": "",
        "Parallel Algorithms for Scientific Computing": ""
      },
      Mechanical: {
        "Heat and Mass Transfer": "",
        "Design of Machine Elements-2": "",
        "Industrial Engineering and Management": "",
        "Engineering Economics and Cost Estimation for Mechanical": ""
      },
      robotics: {
        "Robotic Programming and Simulation": "",
        "Robotic System Design": "",
        "Applied Control Systems": "",
        "Robot Motion Planning": "",
        "Digital Image Processing": "",
        "Engineering Economics and Cost Estimation": ""
      }
    },
    
  
};
  
// courses page
app.get('/course', (req, res) => {
  res.render('course'); // Render courses.ejs
});

// Homepage route
app.get("/", (req, res) => {
  res.render("index", { title: "College Notes Portal" });
});

// Semester route
app.get("/semester/:sem", (req, res) => {
  const sem = req.params.sem;
  const branches = data[sem] ? Object.keys(data[sem]) : null;
  if (!branches) return res.status(404).send("Semester not found");

  res.render("semester", { sem, branches, title: `Semester ${sem} Notes` });
});

// Branch route
app.get("/semester/:sem/:branch", (req, res) => {
  const sem = req.params.sem;
  const branch = req.params.branch;
  const subjects = data[sem][branch]; // This should be an object like { "Subject 1": "file1.pdf", "Subject 2": "file2.pdf" }
  
  if (!subjects) return res.status(404).send("Branch not found");

  res.render("branch", { sem, branch, subjects, title: `${branch} Semester ${sem} Notes` });
});
  
// Assuming your data object holds semester data
// and that 'index' is equivalent to the semester identifier

app.get("/index/:index", (req, res) => {
  const sem = req.params.index;
  const branches = data[sem] ? Object.keys(data[sem]) : null;
  if (!branches) return res.status(404).send("Semester not found");

  // Render the semester page with the corresponding data
  res.render("semester", { sem, branches, title: `Semester ${sem} Notes` });
});

// Subject route
app.get("/semester/:sem/:branch/:subject", (req, res) => {
  const sem = req.params.sem;
  const branch = req.params.branch;
  const subject = req.params.subject;

  const subjectLink = data[sem] && data[sem][branch] && data[sem][branch][subject];
  if (!subjectLink) return res.status(404).send("Subject notes not found");

  // Redirect to the Google Drive link
  res.redirect(subjectLink);
});


app.get('/subjects/:semester/:cycle', (req, res) => {
  const { semester, cycle } = req.params;
  const subjects = data[semester]?.[cycle];

  if (subjects) {
    res.render('subjects', { subjects });
  } else {
    res.status(404).send('Subjects not found');
  }
});
  
// Serve uploaded files correctly
// Serve static files from the "uploads" folder
// Parse form data (if not already configured)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
    // Temporarily store files in "temp_uploads"
    cb(null, "temp_uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Define file filter function using allowed MIME types and extensions
const fileFilter = (req, file, cb) => {
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetypeAllowed = allowedMimeTypes.includes(file.mimetype);
  
  if (extname && mimetypeAllowed) {
    return cb(null, true);
  } else {
    return cb(new Error("Error: File type not supported!"));
  }
};

// Initialize multer with defined storage and file filter
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

  // Define the target directory based on semester, branch, and subject
  const targetDir = path.join(__dirname, "uploads", semester, branch, subject);

  // Create the directory if it doesn't exist
  fs.mkdirSync(targetDir, { recursive: true });

  // Define the target file path
  const targetPath = path.join(targetDir, req.file.filename);

  // Move the file from temp_uploads to the target directory
  fs.rename(req.file.path, targetPath, (err) => {
    if (err) {
      return res.send("Error moving file.");
    }

    // Return a relative URL for viewing the file
    const fileUrl = `/uploads/${encodeURIComponent(semester)}/${encodeURIComponent(branch)}/${encodeURIComponent(subject)}/${encodeURIComponent(req.file.filename)}`;
    
    res.send(`File uploaded successfully: <a href="${fileUrl}" target="_blank">View File</a>`);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

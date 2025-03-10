/* slides */
document.addEventListener("DOMContentLoaded", () => {
  // Menu toggle code
  const menu = document.querySelector('#menu-btn');
  const navbar = document.querySelector('.header .navbar');

  if(menu && navbar){
    menu.onclick = () => {
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
    };

    window.onscroll = () => {
      menu.classList.remove('fa-times');
      navbar.classList.remove('active');
    };
  } else {
    console.error("Menu or Navbar element not found");
  }

  // Initialize Swiper instances with separate variables
  var homeSwiper = new Swiper(".home-slider", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });

  var reviewsSwiper = new Swiper(".reviews-slider", {
    loop: true,
    spaceBetween: 20,
    autoHeight: true,
    grabCursor: true,
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
});


/* upload */
document.addEventListener("DOMContentLoaded", () => {
  const semesterSelect = document.getElementById("semester");
  const branchSelect = document.getElementById("branch");
  const subjectSelect = document.getElementById("subject");

  // Log to verify elements are found
  console.log("Semester select:", semesterSelect);
  console.log("Branch select:", branchSelect);
  console.log("Subject select:", subjectSelect);

  // Mapping of semester values to branches and their subjects
  const subjectsData = {
    "1st_sem": {
      "Physics": [
        "Engineering Mathematics-1",
        "Engineering Physics",
        "Elements of Mechanical Engineering",
        "Elements of Electrical Engineering",
        "Aerospace Engineering",
        "Professional Communication"
      ],
      "Chemistry": [
        "Engineering Mathematics-1",
        "Engineering Chemistry",
        "Elements of Computer Science and Engineering",
        "Engineering Drawing",
        "Kannada"
      ]
    },
    "2nd_sem": {
      "Physics": [
        "Engineering Mathematics-2",
        "Engineering Physics",
        "Engineering Mechanics",
        "Elements of Electronics Engineering",
        "Engineering Drawing",
        "Constitution of India"
      ],
      "Chemistry": [
        "Engineering Mathematics-1",
        "Engineering Chemistry",
        "Elements of Computer Science and Engineering",
        "Engineering Drawing",
        "Kannada"
      ]
    },
    "3rd_sem": {
      "Aerospace": [
        "Engineering Mathematics-3",
        "Materials Science for Engineers",
        "Elements of Aerospace Engineering",
        "Thermodynamics for Engineers",
        "Fluid Mechanics and Machines"
      ],
      "AIML": [
        "Engineering Mathematics-3",
        "Basics of Operating Systems",
        "Mathematics for Machine Learning 1",
        "Data Structures Foundation",
        "Programming Paradigm",
        "Logic Design",
        "Principles of Artificial Intelligence",
        "Indian knowledge System"
      ],
      "Automotive": [
        "Engineering Mathematics-3",
        "Materials Science for Engineers",
        "Elements of Automotive Systems and Autonomous Vehicle",
        "Thermodynamics for Engineers",
        "Fluid Mechanics and Machines",
        "Indian knowledge System"
      ],
      "Computer_science": [
        "Engineering Mathematics-3",
        "Discrete Mathematics",
        "Data Structures Foundation",
        "Logic Design",
        "Programming Paradigm",
        "Indian knowledge System"
      ],
      "Electrical": [
        "Engineering Mathematics-3",
        "Signals and Systems",
        "Network Analysis",
        "Electrical Machines-1",
        "Electronic Circuits",
        "Digital Login Design",
        "Indian knowledge System"
      ],
      "Electronics": [
        "Engineering Mathematics-3",
        "Signals and Systems",
        "Network Analysis and Synthesis",
        "Electronic Circuits",
        "Very Large scale Integration",
        "Digital Login and design",
        "Indian knowledge System"
      ],
      "Information_science": [
        "Engineering Mathematics-3",
        "Discrete Mathematics",
        "Data Structures Foundation",
        "Logic Design",
        "Programming Paradigm",
        "Indian knowledge System"
      ],
      "Mathematics_and_Computing": [
        "Complex Analysis and Vector calculus",
        "Probability and Statistics",
        "Discrete Mathematics",
        "Data Structures Foundation",
        "Programming Paradigm",
        "Logic Design",
        "Indian knowledge System"
      ],
      "Mechanical": [
        "Engineering Mathematics-3",
        "Materials Science",
        "Engineering Thermodynamics",
        "Fluid Mechanics",
        "Manufacturing Processes",
        "Machine Drawing",
        "Mechanical Dissection",
        "Indian knowledge System"
      ],
      "Robotics": [
        "Engineering Mathematics-3",
        "Strength of Materials",
        "Measurements, Data Acquisition and Processing",
        "Introduction to Robotics and Mechatronics",
        "Electrical Machines Drives and Actuators",
        "Machine Drawing",
        "Indian knowledge System"
      ]
    },
    "4th_sem": {
      "Aerospace": [
        "Engineering Mathematics-4",
        "Strength of Materials",
        "Manufacturing Processes for Aerospace Systems",
        "3D Modelling and Machine Drawing",
        "Aerodynamics-1",
        "Innovation and Entrepreneurship"
      ],
      "AIML": [
        "Engineering Mathematics-4",
        "Machine Learning-1",
        "Mathematics for Machine Learning-2",
        "Design and Analysis of Algorithms",
        "Programming Paradigms",
        "Environmental Studies"
      ],
      "Automotive": [
        "Engineering Mathematics-4",
        "Strength of Materials",
        "Manufacturing Processes for Automotive Systems",
        "3D Modelling and Machine Drawing",
        "Automotive Elecrical and Electronic Systems",
        "Innovation and Entrepreneurship"
      ],
      "Civil": [
        "Engineering Mathematics-4",
        "Transportation Engineering-1",
        "Structural Analysis-1",
        "Hydraulics and Hydraulic Machines",
        "Environmental Engineering",
        "Buiding Planning and Computer Aided Drafting",
        "Innovation and Entrepreneurship"
      ],
      "Computer_science": [
        "Engineering Mathematics-4",
        "Design and Analysis of Algorithms",
        "Advanced Data Structures",
        "Software Development Fundamentals",
        "Programming Paradigms",
        "Formal Languages and Automata Theory",
        "Environmental Studies"
      ],
      "Electrical": [
        "Engineering Mathematics-4",
        "Linear Integrated circits",
        "Electromagnetic Theory",
        "Microprocessors and Microcontrollers",
        "Measurement and Instrumentation",
        "Electrical Machines-2",
        "Innovation and Entrepreneurship"
      ],
      "Electronics": [
        "Engineering Mathematics-4",
        "Linear Integrated circits",
        "Electromagnetic Theory",
        "Microprocessors and Microcontrollers",
        "Measurement and Instrumentation",
        "Innovation and Entrepreneurship"
      ],
      "Information_science": [
        "Engineering Mathematics-4",
        "Design and Analysis of Algorithms",
        "Database Management Systems",
        "Computer Networks",
        "Operating Systems",
        "Environmental Studies"
      ],
      "Mathematics_and_Computing": [
        "Inferential Statistics",
        "Integral Transforms",
        "Linear Algebra",
        "Design and Analysis of Algorithms",
        "Formal Languages and Automata Theory",
        "Programming Paradigms",
        "Environmental Studies"
      ],
      "Mechanical": [
        "Engineering Mathematics-4",
        "Fluid Machines",
        "Conventional Machining Processses",
        "Strength of Materials"
      ],
      "Robotics": [
        "Engineering Mathematics-4",
        "Analog and Digital Electronics",
        "Artificial Intelligence for Robotics",
        "Digital Signal Processing",
        "Fluid Power Systems for Robots",
        "Mechanical Dissection"
      ]
    }
  };

  // Listen for changes on the semester dropdown
  semesterSelect.addEventListener("change", () => {
    const selectedSemester = semesterSelect.value;
    // Clear branch and subject dropdowns
    branchSelect.innerHTML = `<option value="">Select Branch</option>`;
    subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
    
    if (selectedSemester && subjectsData[selectedSemester]) {
      const branches = Object.keys(subjectsData[selectedSemester]);
      console.log("Branches:", branches);  // Debug log
      branches.forEach(branch => {
        const option = document.createElement("option");
        option.value = branch;
        option.textContent = branch.replace('_', ' ');
        branchSelect.appendChild(option);
      });
    }
  });

  // Listen for changes on the branch dropdown
  branchSelect.addEventListener("change", () => {
    const selectedSemester = semesterSelect.value;
    const selectedBranch = branchSelect.value;
    // Clear subject dropdown
    subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
    
    if (selectedSemester &&
        selectedBranch &&
        subjectsData[selectedSemester] &&
        subjectsData[selectedSemester][selectedBranch]
    ) {
      const subjects = subjectsData[selectedSemester][selectedBranch];
      console.log("Subjects:", subjects);  // Debug log
      subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
      });
    }
  });
});



// todo list
// access input field
const input = document.querySelector('#todo-input');

// Listening to click event from "Add" button.
document.querySelector('#submit').addEventListener('click', () => {
  // value of the input field
  const inputData = input.value;
  input.value = "";

  // creating todo item element
  const todo_el = document.createElement('div');
  todo_el.classList.add('todo-item');

  const todo_content_el = document.createElement('div');
  todo_el.appendChild(todo_content_el);

  const todo_input_el = document.createElement('input');
  todo_input_el.classList.add('text');
  todo_input_el.type = 'text';
  todo_input_el.value = inputData;
  todo_input_el.setAttribute('readonly', 'readonly');

  todo_content_el.appendChild(todo_input_el);

  const todo_actions_el = document.createElement('div');
  todo_actions_el.classList.add('action-items');

  const todo_done_el = document.createElement('i');
  todo_done_el.classList.add('fa-solid');
  todo_done_el.classList.add('fa-check');

  const todo_edit_el = document.createElement('i');
  todo_edit_el.classList.add('fa-solid');
  todo_edit_el.classList.add('fa-pen-to-square');
  todo_edit_el.classList.add('edit');

  const todo_delete_el = document.createElement('i');
  todo_delete_el.classList.add('fa-solid');
  todo_delete_el.classList.add('fa-trash');

  todo_actions_el.appendChild(todo_done_el)
  todo_actions_el.appendChild(todo_edit_el);
  todo_actions_el.appendChild(todo_delete_el);

  todo_el.appendChild(todo_actions_el);
  console.log(todo_el)
  // add the todo-item to lists
  document.querySelector('.todo-lists').appendChild(todo_el);

  // done functionality
  todo_done_el.addEventListener('click', () => {
    todo_input_el.classList.add('done')
    todo_el.removeChild(todo_actions_el);
  })

  // edit functionality
  todo_edit_el.addEventListener('click', (e) => {
    if (todo_edit_el.classList.contains("edit")) {
      todo_edit_el.classList.remove("edit");
      todo_edit_el.classList.remove("fa-pen-to-square");
      todo_edit_el.classList.add("fa-x");
      todo_edit_el.classList.add("save");
      todo_input_el.removeAttribute("readonly");
      todo_input_el.focus();
    } else {
      todo_edit_el.classList.remove("save");
      todo_edit_el.classList.remove("fa-x");
      todo_edit_el.classList.add("fa-pen-to-square");
      todo_edit_el.classList.add("edit");
      todo_input_el.setAttribute("readonly", "readonly");
    }
  });

  // delete functionality
  todo_delete_el.addEventListener('click', (e) => {
    console.log(todo_el);
    document.querySelector('.todo-lists').removeChild(todo_el);
  });
})



  




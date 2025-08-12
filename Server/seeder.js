const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Qustion = require("./Modals/Qustion");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log(" MongoDB connected for seeding");

    const questions = [
      {
        questionText: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
          "Hyper Transfer Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        questionText: "Which CSS property changes the text color?",
        options: ["font-color", "text-color", "color", "background-color"],
        correctAnswer: "color"
      },
      {
        questionText: "Which JavaScript keyword declares a variable?",
        options: ["var", "variable", "v", "let"],
        correctAnswer: "var"
      },
      {
        questionText: "Which company developed React?",
        options: ["Google", "Facebook", "Microsoft", "Amazon"],
        correctAnswer: "Facebook"
      },
      {
        questionText: "Which protocol is used for secure communication?",
        options: ["HTTP", "HTTPS", "FTP", "TCP"],
        correctAnswer: "HTTPS"
      },
      {
        questionText: "What does CSS stand for?",
        options: [
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets"
      },
      {
        questionText: "Which HTML tag is used for largest heading?",
        options: ["<h1>", "<heading>", "<h6>", "<h2>"],
        correctAnswer: "<h1>"
      },
      {
        questionText: "Which JavaScript operator checks both value & type?",
        options: ["==", "===", "=", "!=="],
        correctAnswer: "==="
      },
      {
        questionText: "Which database is NoSQL?",
        options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
        correctAnswer: "MongoDB"
      },
      {
        questionText: "Which method is used to parse JSON strings in JS?",
        options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "JSON.decode()"],
        correctAnswer: "JSON.parse()"
      },
      {
        questionText: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: "JavaScript"
      },
      {
        questionText: "What is the output of 2 + '2' in JavaScript?",
        options: ["4", "22", "'4'", "'22'"],
        correctAnswer: "22"
      },
      {
        questionText: "Which tag is used to create a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<hyperlink>"],
        correctAnswer: "<a>"
      },
      {
        questionText: "Which function is used to print in Python?",
        options: ["echo()", "print()", "console.log()", "printf()"],
        correctAnswer: "print()"
      },
      {
        questionText: "Which is a JavaScript framework?",
        options: ["Django", "React", "Laravel", "Spring"],
        correctAnswer: "React"
      }
    ];

    await Qustion.deleteMany();
    await Qustion.insertMany(questions);

    console.log("Questions seeded successfully");
    process.exit();
  })
  .catch(err => {
    console.error("Error seeding data:", err);
    process.exit(1);
  });

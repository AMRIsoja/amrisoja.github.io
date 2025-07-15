import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'chapter1', 'chapter2'

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col">
      <Navbar navigate={navigate} currentPage={currentPage} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {currentPage === 'home' && <HomePage navigate={navigate} />}
        {currentPage === 'chapter1' && <Chapter1 />}
        {currentPage === 'chapter2' && <Chapter2 />}
      </main>
      <Footer />
    </div>
  );
};

// Navbar Component
const Navbar = ({ navigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemClass = (page) =>
    `block px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200 ${
      currentPage === page
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-700 cursor-pointer" onClick={() => navigate('home')}>
          Python Course
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none focus:text-gray-900">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
        <div className={`md:flex items-center space-x-4 ${isOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}>
          <a href="#" onClick={() => navigate('home')} className={navItemClass('home')}>
            Home
          </a>
          <a href="#" onClick={() => navigate('chapter1')} className={navItemClass('chapter1')}>
            Chapter 1
          </a>
          <a href="#" onClick={() => navigate('chapter2')} className={navItemClass('chapter2')}>
            Chapter 2
          </a>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center text-sm">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Python Course. All rights reserved.</p>
        <p className="mt-2">Designed for comprehensive learning.</p>
      </div>
    </footer>
  );
};

// Home Page Component
const HomePage = ({ navigate }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center max-w-3xl mx-auto my-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 leading-tight">
        Welcome to the Comprehensive Python Learning Guide!
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        Embark on your journey to master Python programming. This guide is designed to provide a foundational understanding, delving into its origins, core characteristics, and essential setup steps.
      </p>
      <div className="space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row justify-center">
        <button
          onClick={() => navigate('chapter1')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
        >
          Start Chapter 1: Python Foundations
        </button>
        <button
          onClick={() => navigate('chapter2')}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
        >
          Start Chapter 2: Core Python Syntax
        </button>
      </div>
      <div className="mt-10 text-left text-gray-600">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What You'll Learn:</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>The history and evolution of Python.</li>
          <li>Key features that make Python versatile.</li>
          <li>How the Python interpreter works.</li>
          <li>Setting up your development environment.</li>
          <li>Fundamental syntax and data types.</li>
          <li>Variables and naming conventions.</li>
          <li>Understanding and using Python operators.</li>
        </ul>
        <p className="mt-6 text-md italic">
          This interactive guide includes exercises and quizzes to reinforce your learning at every step.
        </p>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-200 pb-2">
      {title}
    </h2>
    <div className="prose max-w-none text-gray-700 leading-relaxed">
      {children}
    </div>
  </section>
);

// Reusable Exercise Component
const Exercise = ({ question, correctAnswer, placeholder = "Your answer here", type = "text" }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = () => {
    if (type === "text") {
      if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        setFeedback('Correct! Well done.');
        setIsCorrect(true);
      } else {
        setFeedback(`Incorrect. The correct answer is: "${correctAnswer}"`);
        setIsCorrect(false);
      }
    } else if (type === "code") {
      // For code exercises, we might just check for presence or a simple pattern
      if (answer.includes(correctAnswer)) {
        setFeedback('Looks good! This code snippet demonstrates the concept.');
        setIsCorrect(true);
      } else {
        setFeedback('Keep trying! Make sure your code includes the key elements.');
        setIsCorrect(false);
      }
    }
  };

  return (
    <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 mt-6">
      <h3 className="text-xl font-semibold text-blue-800 mb-3">Exercise:</h3>
      <p className="mb-4">{question}</p>
      {type === "text" && (
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      )}
      {type === "code" && (
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={placeholder}
          rows="5"
          className="w-full p-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      )}
      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200"
      >
        Check Answer
      </button>
      {feedback && (
        <p className={`mt-3 text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

// Reusable Quiz Component
const Quiz = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmitQuiz = () => {
    let currentScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswerIndex) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResults(true);
  };

  return (
    <div className="bg-purple-50 p-5 rounded-lg border border-purple-200 mt-6">
      <h3 className="text-xl font-semibold text-purple-800 mb-3">Quiz Time!</h3>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-4 p-3 border border-purple-100 rounded-md bg-white">
          <p className="font-medium text-gray-800 mb-2">{qIndex + 1}. {q.question}</p>
          {q.options.map((option, oIndex) => (
            <label key={oIndex} className="block cursor-pointer py-1">
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={oIndex}
                checked={selectedAnswers[qIndex] === oIndex}
                onChange={() => handleOptionChange(qIndex, oIndex)}
                className="mr-2 accent-purple-600"
              />
              {option}
            </label>
          ))}
          {showResults && (
            <div className="mt-2 text-sm">
              {selectedAnswers[qIndex] === q.correctAnswerIndex ? (
                <span className="text-green-600 font-semibold">Correct!</span>
              ) : (
                <span className="text-red-600 font-semibold">
                  Incorrect. Correct answer: {q.options[q.correctAnswerIndex]}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmitQuiz}
        className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200"
      >
        Submit Quiz
      </button>
      {showResults && (
        <div className="mt-4 text-center text-lg font-bold">
          Your score: {score} out of {questions.length}
        </div>
      )}
    </div>
  );
};

// Chapter 1 Component
const Chapter1 = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10">
        Chapter 1: Python Foundations
      </h1>

      <Section title="1.1 What is Python?">
        <p>
          Python is a widely adopted, general-purpose, high-level programming language that has significantly influenced the landscape of software development. Its design principles prioritize readability and simplicity, making it accessible for beginners while robust enough for complex applications.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1.1 History and Evolution</h3>
        <p>
          The genesis of Python can be traced back to the late 1980s, when Guido van Rossum, a Dutch programmer at Centrum Wiskunde & Informatica (CWI) in the Netherlands, embarked on it as a personal hobby project during the Christmas holidays of 1989. His objective was to develop a language that emphasized clear, readable code and reduced the number of lines required to express concepts compared to other languages of the era, such as Java or C++. The distinctive name "Python" was inspired by Van Rossum's fondness for the British comedy series 'Monty Python's Flying Circus,' chosen to convey a sense of enjoyment and playfulness in programming.
        </p>
        <p className="mt-3">
          The first official release, Python 1.0, occurred on January 26, 1994, introducing fundamental features that remain integral to the language, including lambda functions, map, filter, reduce for functional programming, and the crucial concept of exceptions for robust error handling. Subsequent major releases marked significant milestones. Python 2.0, launched on October 16, 2000, brought enhancements such as list comprehensions, garbage collection, and improved Unicode support. A pivotal shift occurred with the release of Python 3.0 in 2008, which introduced fundamental changes and improvements, including cleaner syntax, enhanced input/output handling, and further optimized Unicode support. This version marked a deliberate move towards a more consistent and modern language, with Python 2 officially reaching its end-of-life on January 1, 2020, concluding a decade-long transition period.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1.2 Key Features</h3>
        <p>
          Python is distinguished by several key attributes that contribute to its widespread adoption and versatility. It functions as an interpreted language, meaning code is executed directly, line by line, without a prior compilation step into machine-specific instructions. It supports interactive development, allowing programmers to execute code snippets and receive immediate feedback, which is particularly beneficial for rapid prototyping and learning. Fundamentally, Python is an object-oriented programming language, treating virtually all data and functions as objects, which provides a consistent and powerful model for structuring code.
        </p>
        <p className="mt-3">
          Beyond these core characteristics, Python incorporates a robust module system for organizing code, a sophisticated exception handling mechanism for managing errors gracefully, and dynamic typing, which allows variable types to be determined at runtime. Its high-level dynamic data types, such as lists, dictionaries, and sets, further enhance its expressiveness and efficiency in handling complex data structures.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1.3 Programming Paradigms</h3>
        <p>
          Python's design embraces a multi-paradigm approach, supporting various programming styles including object-oriented, procedural (imperative), functional, structured, and reflective programming. This inherent flexibility is a significant asset for a comprehensive learning guide, as it empowers developers to adopt the most suitable problem-solving strategies for diverse scenarios. The language's design philosophy, often encapsulated by the maxim "practicality beats purity," means it does not strictly enforce a single programming style.
        </p>
        <p className="mt-3">
          This adaptability allows developers to select the most appropriate paradigm for a given problem or project stage. For instance, object-oriented principles can be applied for structuring large, complex applications, while functional programming constructs might be preferred for data transformations or operations that benefit from immutability and side-effect avoidance. The ability to treat functions as first-class objects in Python is a cornerstone of its functional programming capabilities, enabling the design and use of higher-order functions—functions that can take other functions as arguments or return them as results. By highlighting this multi-paradigm support early in the learning process, a guide can prepare learners for the diversity of Python code encountered in real-world applications and encourage them to critically evaluate when to apply different approaches, fostering a more adaptable and robust understanding of software design principles.
        </p>

        <Exercise
          question="Who is the creator of Python, and what was the inspiration behind its name?"
          correctAnswer="Guido van Rossum, Monty Python's Flying Circus"
        />
        <Quiz
          questions={[
            {
              question: "Which of the following is NOT a key feature of Python?",
              options: ["Interpreted Language", "Compiled Language", "Object-Oriented", "Dynamic Typing"],
              correctAnswerIndex: 1,
            },
            {
              question: "Python supports which of the following programming paradigms?",
              options: ["Only Object-Oriented", "Only Procedural", "Multi-paradigm", "Only Functional"],
              correctAnswerIndex: 2,
            },
          ]}
        />
      </Section>

      <Section title="1.2 How Python Works: The Interpreter and Execution Model">
        <p>
          Understanding the internal workings of the Python interpreter is crucial for effective programming, as it demystifies code execution and significantly aids in debugging efforts. This section details the process by which Python code is transformed and executed.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2.1 What is an Interpreter?</h3>
        <p>
          At its core, Python is an interpreted language. Unlike compiled languages that translate an entire program into machine code before execution, Python's interpreter processes code line by line. This characteristic allows for immediate execution and feedback, making Python highly interactive. The most prevalent Python interpreter is CPython, which is implemented in the C programming language. CPython acts as a converter, transforming high-level Python code into lower-level machine-understandable instructions.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2.2 The Execution Process (CPython)</h3>
        <p>
          The execution of a Python program via CPython involves a series of distinct steps, each contributing to the transformation of source code into executable instructions.
        </p>
        <ol className="list-decimal list-inside space-y-2 mt-4">
          <li>
            <strong>Step 1: Lexing:</strong> The initial phase of code analysis is lexing. During this step, the Python interpreter's lexer component breaks down the source code into a stream of smaller, meaningful units known as tokens. This process is akin to segmenting a sentence into individual words, preparing it for structural analysis.
          </li>
          <li>
            <strong>Step 2: Parsing:</strong> Following lexing, the parser component takes these tokens and constructs an Abstract Syntax Tree (AST). The AST is a hierarchical representation that illustrates the grammatical structure of the code and the relationships between its tokens. This stage is critical for identifying syntax errors; if any are detected, the interpreter halts the translation process and reports an error message, preventing further execution. For new programmers, recognizing that syntax errors are caught at this parsing stage helps them understand that these are structural issues preventing the program from even beginning its operation.
          </li>
          <li>
            <strong>Step 3: Bytecode Creation:</strong> Upon successful parsing, a compiler, which is an integral part of the Python interpreter, translates the AST into an intermediate language called bytecode. This bytecode is a low-level, platform-independent representation of the original source code. It is often saved to .pyc files, which serve as a compiled version that can be executed more rapidly in subsequent runs. This step typically occurs internally and is largely hidden from the developer, contributing to faster program execution compared to re-interpreting the original source code every time.
          </li>
          <li>
            <strong>Step 4: Conversion to Machine-executable Code (PVM):</strong> The Python Virtual Machine (PVM) is the central runtime engine responsible for executing Python programs. The PVM operates as a large loop, iterating through the bytecode instructions stored in .pyc files. It translates these instructions into machine code (binary 0s and 1s) that the computer's CPU can directly understand and execute. Concurrently, the PVM manages the integration and loading of necessary inputs and external libraries, ensuring that all required components are available for successful program execution. Understanding that runtime errors occur during this PVM execution phase indicates that the code was syntactically valid but encountered an issue during its operation, such as attempting an invalid arithmetic operation or accessing a non-existent variable.
          </li>
          <li>
            <strong>Step 5: Returning Output:</strong> After the bytecode is converted and executed by the PVM, the interpreter produces the program's output. If no runtime errors are encountered during this final execution phase, the program concludes successfully. This step-by-step understanding of the interpreter's workflow empowers learners to diagnose problems more effectively, moving beyond rote memorization of syntax to a deeper appreciation of the language's internal mechanisms. This foundational knowledge is crucial for writing robust and maintainable code, and for developing advanced debugging skills.
          </li>
        </ol>

        <Quiz
          questions={[
            {
              question: "What is the first step in the Python execution process?",
              options: ["Parsing", "Lexing", "Bytecode Creation", "PVM Execution"],
              correctAnswerIndex: 1,
            },
            {
              question: "What is an AST?",
              options: ["Abstract Syntax Tree", "Advanced System Tool", "Application Service Tag", "Automated Software Test"],
              correctAnswerIndex: 0,
            },
            {
              question: "What is the role of the Python Virtual Machine (PVM)?",
              options: ["To compile code into machine code before execution", "To process code line by line", "To translate bytecode into machine code and execute it", "To manage project dependencies"],
              correctAnswerIndex: 2,
            },
          ]}
        />
      </Section>

      <Section title="1.3 Setting Up Your Python Environment">
        <p>
          A properly configured Python environment is fundamental for efficient and conflict-free development. This section outlines the installation process and the critical role of virtual environments.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.3.1 Python Installation</h3>
        <p>
          This guide focuses on Python 3.x, as Python 2 reached its official end-of-life on January 1, 2020, and is no longer supported. For users on modern Ubuntu operating systems (e.g., Ubuntu 20.04 and newer), Python 3 is frequently pre-installed or can be easily installed using the system's package manager, apt. This simplifies the initial setup for many Linux users.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.3.2 Virtual Environments</h3>
        <p>
          Virtual environments are an indispensable tool in professional Python development, serving to isolate project dependencies and prevent conflicts that can arise when multiple projects require different versions of the same library.
        </p>
        <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Purpose:</h4>
        <p>
          A virtual environment encapsulates a specific Python interpreter and its associated software libraries and binaries, ensuring that a project's dependencies are isolated from other projects and from the global Python installation on the operating system. This isolation prevents "dependency hell," a common issue where conflicting library versions across projects lead to instability. Conventionally, virtual environments are named <code>.venv</code> or <code>venv</code> and should never be committed to source control systems like Git, as they contain environment-specific paths and compiled binaries. The consistent emphasis on virtual environments (both venv and conda) signifies a fundamental best practice for professional Python development, addressing critical dependency management challenges. Neglecting virtual environments often leads to unstable development setups, difficult debugging, and non-reproducible results, directly hindering productivity and project success.
        </p>
        <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Using venv (Standard Library):</h4>
        <p>
          The <code>venv</code> module is part of Python's standard library, providing a built-in way to create lightweight virtual environments.
        </p>
        <p className="mt-3">
          <strong>Creation:</strong> A new virtual environment can be created within a project directory by executing:
        </p>
        <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>python -m venv my_project_env</code></pre>
        <p className="mt-2">
          This command establishes a directory (e.g., <code>my_project_env</code>) containing a copy or symlink of the Python executable and a <code>site-packages</code> subdirectory for project-specific libraries.
        </p>
        <div className="flex justify-center my-4">
          {/* Replaced base64 image with a placeholder */}
          <img
            src="https://placehold.co/600x300/cccccc/000000?text=Venv+Creation+Example"
            alt="Venv Creation Example"
            className="rounded-lg shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/cccccc/000000?text=Image+Not+Available'; }}
          />
        </div>
        <p className="mt-3">
          <strong>Activation (macOS/Linux):</strong> To begin working within the environment on Unix-like systems, the activation script is sourced:
        </p>
        <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>source my_project_env/bin/activate</code></pre>
        <p className="mt-2">
          This modifies the system's PATH variable to prioritize the environment's Python interpreter.
        </p>
        <div className="flex justify-center my-4">
          {/* Replaced base64 image with a placeholder */}
          <img
            src="https://placehold.co/600x300/cccccc/000000?text=Venv+Activation+Example"
            alt="Venv Activation Example"
            className="rounded-lg shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/cccccc/000000?text=Image+Not+Available'; }}
          />
        </div>
        <p className="mt-3">
          <strong>Activation (Windows):</strong> On Windows, the activation command is <code>.\my_project_env\Scripts\activate</code>.
        </p>
        <p className="mt-3">
          <strong>Deactivation:</strong> To exit the virtual environment and return to the global Python installation, the <code>deactivate</code> command is used.
        </p>
        <div className="flex justify-center my-4">
          {/* Replaced base64 image with a placeholder */}
          <img
            src="https://placehold.co/600x300/cccccc/000000?text=Venv+Deactivation+Example"
            alt="Venv Deactivation Example"
            className="rounded-lg shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/cccccc/000000?text=Image+Not+Available'; }}
          />
        </div>
        <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Using conda (Anaconda/Miniconda):</h4>
        <p>
          The <code>conda</code> package manager is highly recommended for users involved in data analysis and scientific computing. It simplifies the installation of Python, pandas, NumPy, and other packages within the PyData stack, often resolving complex binary dependencies more effectively than pip. Miniconda offers a minimal, self-contained Python installation with the conda manager.
        </p>
        <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Purpose:</h4>
        <p>
          <code>conda</code> environments are akin to <code>venv</code> environments but are capable of managing non-Python software dependencies, making them particularly robust for scientific computing.
        </p>
        <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Creation:</h4>
        <p>
          A new conda environment can be created with a specific Python version and initial packages using <code>conda create -c conda-forge -n my_env_name python pandas</code>.
        </p>
        <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Activation (macOS/Linux):</h4>
        <p>
          Environments are activated using <code>source activate my_env_name</code> or <code>conda activate my_env_name</code>.
        </p>
        <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Activation (Windows):</h4>
        <p>
          On Windows, the command is <code>activate my_env_name</code>.
        </p>
        <Exercise
          question="What is the primary purpose of a virtual environment in Python development?"
          correctAnswer="To isolate project dependencies"
        />
        <Quiz
          questions={[
            {
              question: "Which command is used to create a new virtual environment using venv?",
              options: ["python create venv my_env", "python -m venv my_env", "venv new my_env", "create-venv my_env"],
              correctAnswerIndex: 1,
            },
            {
              question: "Why should virtual environments typically not be committed to source control systems?",
              options: ["They are too large", "They contain environment-specific paths and compiled binaries", "They are not useful for collaboration", "They are automatically generated by Git"],
              correctAnswerIndex: 1,
            },
          ]}
        />
      </Section>
    </div>
  );
};

// Chapter 2 Component
const Chapter2 = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10">
        Chapter 2: Core Python Syntax and Data Types
      </h1>

      <Section title="2.1 Literals and Basic Syntax">
        <p>
          Python's design philosophy places a strong emphasis on readability and clarity, which is evident in its basic syntax and the representation of literals.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1.1 Python's Readability and Structure</h3>
        <p>
          Python is intentionally designed as an easily readable language, characterized by visually uncluttered formatting and the frequent use of English keywords where other languages might employ punctuation. A distinguishing feature of Python's syntax is its reliance on whitespace indentation, typically four spaces, to define code blocks, rather than curly brackets or keywords. This "off-side rule" ensures that the program's visual structure directly corresponds to its semantic structure, enhancing code comprehension. While semicolons are permitted after statements, they are rarely used in standard Python practice, further contributing to the clean aesthetic.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1.2 Comments</h3>
        <p>
          Comments are non-executable lines within code used for documentation and explanation. In Python, a single-line comment begins with the hash symbol (#). Comments can occupy an entire line or follow a line of code to provide inline explanations.
        </p>
        <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code># This is a single line comment in Python
name = "Hafsa" # this is an inline comment</code></pre>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1.3 Literals</h3>
        <p>
          Literals represent fixed values that are directly embedded within the source code. They are the raw data values assigned to variables or used in expressions.
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>
            <strong>Integer Literals:</strong> These are whole numbers, which can be positive, negative, or zero, and do not contain any fractional parts or decimal points. Examples include <code>5</code>, <code>100</code>, and <code>-2</code>.
          </li>
          <li>
            <strong>Float Literals:</strong> These represent real numbers that include a fractional component, denoted by a decimal point. Examples include <code>3.14</code>, <code>12.99</code>, and <code>0.0</code>.
          </li>
          <li>
            <strong>Boolean Literals:</strong> These represent truth values, restricted to <code>True</code> or <code>False</code>.
          </li>
          <li>
            <strong>String Literals:</strong> These are sequences of characters, which can include letters, numbers, whitespace, or punctuation, enclosed within quotation marks. Python supports single quotes (<code>'...'</code>), double quotes (<code>"..."</code>), or triple quotes (<code>"""..."""</code> or <code>'''...'''</code>) for multi-line strings. Python does not have a distinct 'character' data type; a single character is simply a string of length one.
          </li>
        </ul>
        <Exercise
          question="Write a single-line comment in Python that says 'My first comment'."
          correctAnswer="# My first comment"
          type="code"
        />
        <Quiz
          questions={[
            {
              question: "Which of the following is NOT a valid way to define a string literal in Python?",
              options: ["'Hello'", "\"World\"", "'''Multi-line'''", "`Backticks`"],
              correctAnswerIndex: 3,
            },
            {
              question: "What is the distinguishing feature of Python's syntax for defining code blocks?",
              options: ["Curly brackets", "Keywords like 'begin' and 'end'", "Whitespace indentation", "Semicolons"],
              correctAnswerIndex: 2,
            },
          ]}
        />
      </Section>

      <Section title="2.2 Built-in Data Types">
        <p>
          Data types are fundamental to programming as they define the kind of values variables can store and the operations that can be performed on those values. Python offers a rich set of built-in data types, categorized for different purposes.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2.1 Numeric Types</h3>
        <p>
          Python provides three primary numeric types:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>
            <strong><code>int</code>:</strong> Represents integers, which are whole numbers (positive, negative, or zero) without any fractional or decimal components.
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>5
-100
0</code></pre>
          </li>
          <li>
            <strong><code>float</code>:</strong> Represents floating-point numbers, which are real numbers containing a decimal point.
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>0.8
3.7</code></pre>
          </li>
          <li>
            <strong><code>complex</code>:</strong> Represents complex numbers, consisting of a real part and an imaginary part, typically denoted with a <code>j</code> suffix (e.g., <code>2+7j</code>).
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>2 + 7j
4 - 9j</code></pre>
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2.2 Boolean Type (bool)</h3>
        <p>
          The <code>bool</code> type represents logical truth values. It has two built-in values: <code>True</code> and <code>False</code>.
        </p>
        <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>True
False</code></pre>
        <div className="flex justify-center my-4">
          {/* Replaced base64 image with a placeholder */}
          <img
            src="https://placehold.co/600x300/cccccc/000000?text=Python+Type+Examples"
            alt="Python Type Examples"
            className="rounded-lg shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/cccccc/000000?text=Image+Not+Available'; }}
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2.3 Sequence Types</h3>
        <p>
          Sequence types are ordered collections of data, allowing for the storage of multiple values in an organized manner.
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>
            <strong><code>str</code> (String):</strong> An immutable sequence of Unicode characters. Strings are defined using single, double, or triple quotes. As previously noted, a single character is treated as a string of length one in Python.
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>"This is a string"</code></pre>
          </li>
          <li>
            <strong><code>list</code>:</strong> A mutable, ordered collection of items. Lists are highly flexible, as their elements do not need to be of the same data type. They are defined using square brackets (<code>[]</code>).
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>["ths", "is", "a", "list", "of", "strings"]
[1, 2, 3, 4, 5]</code></pre>
          </li>
          <li>
            <strong><code>tuple</code>:</strong> An immutable, ordered collection of Python objects. Similar to lists, but once created, the elements of a tuple cannot be modified. Tuples are defined using parentheses (<code>()</code>).
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>("this", "is", "a", "tuple", "which","you", "can't", "modify")</code></pre>
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2.4 Set Type (set)</h3>
        <p>
          The <code>set</code> type represents an unordered collection of unique elements. Sets are useful for operations requiring membership testing or the elimination of duplicate values.
        </p>
        <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>{"{\"mango\", \"banana\", \"apple\"}"}</code></pre>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2.5 Dictionary Type (dict)</h3>
        <p>
          The <code>dict</code> type represents an unordered collection of key:value pairs. Each key within a dictionary must be unique, and keys are separated from their corresponding values by a colon, while pairs are separated by commas.
        </p>
        <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>{`{"Student" : "Saudat Umar", "Class" : "Nursery 2", "Position" : 1}`}</code></pre>
        <p className="mt-3">
          Python's dynamic typing, combined with its strong typing, offers a powerful balance of flexibility and error prevention. Python employs "duck typing," meaning that the type of a variable is determined at runtime based on the value assigned to it, and type constraints are not checked during definition. Instead, operations on an object might fail at the point of usage if the object is not of an appropriate type. Despite this dynamic nature, Python is strongly typed, which means it explicitly forbids poorly defined operations, such as attempting to add a number and a string directly, rather than quietly attempting to interpret them through implicit type coercion. This combination means that while explicit type declarations are not required, simplifying initial coding, Python will prevent nonsensical operations, leading to clearer error messages and fewer subtle bugs that might arise in weakly typed languages. This design choice makes Python approachable for beginners by reducing boilerplate code, yet robust by catching common type-related mistakes early, fostering a better understanding of data integrity.
        </p>
        <Exercise
          question="Create a Python list named `fruits` containing 'apple', 'banana', and 'cherry'."
          correctAnswer="fruits = ['apple', 'banana', 'cherry']"
          type="code"
        />
        <Quiz
          questions={[
            {
              question: "Which Python data type is mutable and ordered?",
              options: ["tuple", "str", "list", "set"],
              correctAnswerIndex: 2,
            },
            {
              question: "What is the key characteristic of a Python `set`?",
              options: ["Ordered and allows duplicates", "Ordered and unique elements", "Unordered and allows duplicates", "Unordered and unique elements"],
              correctAnswerIndex: 3,
            },
          ]}
        />
      </Section>

      <Section title="2.3 Variables and Naming Conventions">
        <p>
          Variables are fundamental constructs in programming, serving as symbolic names that reference values or objects stored in a computer's memory. They enable programmers to assign descriptive labels to data, facilitating its manipulation and reuse throughout a codebase.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.3.1 What are Variables?</h3>
        <p>
          In Python, variables are dynamically typed. This means that the type of a variable is automatically inferred at runtime based on the value assigned to it. Furthermore, the type of a variable can be changed through reassignment; for example, a variable initially holding an integer can later be assigned a string value, and its type will update accordingly. This flexibility allows for concise code but also necessitates careful attention to data types during development.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.3.2 Python Variable Naming Rules</h3>
        <p>
          To ensure code runs smoothly and adheres to Python's syntax, specific rules govern variable naming:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>
            <strong>Case-Sensitive:</strong> Python differentiates between uppercase and lowercase letters; thus, <code>age</code> and <code>Age</code> are recognized as distinct variables.
          </li>
          <li>
            <strong>Starts with Letter or Underscore:</strong> A variable name must commence with either an alphabetic character (a-z, A-Z) or an underscore (<code>_</code>). It is impermissible for a variable name to begin with a number.
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>student = "Abubakar" # correct
# 2student = "Abubakar" # error: python will raise SyntaxError</code></pre>
          </li>
          <li>
            <strong>Alphanumeric and Underscores:</strong> Following the initial character, the variable name can consist of any combination of letters, numbers, and underscores.
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>debate_participants = ["Ahmad", "Ibrahim", "Asma'u", "Halima"] # correct variable
# class_ref! = "Abdullahi" # error: special characters are not allowed</code></pre>
          </li>
          <li>
            <strong>No Spaces:</strong> Spaces are not permitted within variable names. For multi-word names, underscores are typically used as separators.
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code># best student = "Maryam" # error: no space allowed in a variable
best_student = "Maryam" # correct variable name</code></pre>
          </li>
          <li>
            <strong>Avoid Reserved Keywords:</strong> Python has a set of reserved keywords (e.g., <code>class</code>, <code>def</code>, <code>if</code>) that possess special meaning in the language and therefore cannot be used as variable names.
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code># class = 3 # error: class is a Python keyword, use another name instead
Class = 3 # correct</code></pre>
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.3.3 Naming Conventions (Best Practices)</h3>
        <p>
          While Python's rules define what is syntactically valid, established naming conventions provide guidelines for writing readable, maintainable, and collaborative code. Adhering to these conventions, though not strictly enforced by the interpreter, is critical for producing high-quality software.
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>
            <strong>Lowercase for Regular Variables:</strong> The most common and recommended practice for multi-word variable names is <code>snake_case</code>, where lowercase words are separated by underscores (e.g., <code>total_amount</code>, <code>number_of_graduates</code>). This convention significantly enhances code readability, especially in larger projects, by making variable names easy to parse at a glance.
          </li>
          <li>
            <strong>Uppercase for Constants:</strong> For variables intended to represent constants (values that should not change during program execution), the convention is to use <code>UPPER_CASE</code> with underscores separating words (e.g., <code>PI</code>, <code>MAX_SIZE</code>).
          </li>
          <li>
            <strong>Descriptive Names:</strong> Variables should be given names that clearly and accurately reflect their purpose or the data they hold (e.g., <code>user_count</code> is preferred over a generic <code>x</code>). This practice reduces cognitive load for anyone reading the code, including the original author in the future, and is a core principle of software engineering that directly impacts long-term maintainability. In collaborative environments, consistent adherence to these conventions allows developers to focus on the logic rather than deciphering inconsistent naming styles, thereby improving project efficiency and reducing errors.
          </li>
        </ul>
        <Exercise
          question="Which of the following is a good variable name according to Python's best practices for a variable storing the number of active users?"
          correctAnswer="active_users_count"
        />
        <Quiz
          questions={[
            {
              question: "Which of these is a valid Python variable name?",
              options: ["1st_name", "my-variable", "_private_var", "if"],
              correctAnswerIndex: 2,
            },
            {
              question: "What naming convention is recommended for constants in Python?",
              options: ["camelCase", "PascalCase", "snake_case", "UPPER_CASE"],
              correctAnswerIndex: 3,
            },
          ]}
        />
      </Section>

      <Section title="2.4 Operators">
        <p>
          Operators are special symbols or keywords that perform operations on values and variables. Python provides a comprehensive set of operators categorized by their function.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.4.1 Arithmetic Operators</h3>
        <p>
          These operators perform mathematical calculations:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li><code>+</code>: Addition</li>
          <li><code>-</code>: Subtraction</li>
          <li><code>*</code>: Multiplication</li>
          <li><code>/</code>: Division (returns a float)</li>
          <li><code>%</code>: Modulus (returns the remainder of a division)</li>
          <li><code>**</code>: Exponentiation (raises a number to a power)</li>
        </ul>
        <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto mt-2"><code>4 + 6
"First name" + " " + "Surname"
10 - 3
20 / 5
10 % 9
10 ** 8</code></pre>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.4.2 Assignment Operators</h3>
        <p>
          Assignment operators are used to assign values to variables:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>
            <code>=</code>: The basic assignment operator, which binds a name as a reference to an object.
          </li>
          <li>
            <code>+=</code>: The "plus-equals" operator, which adds a value to a variable and then assigns the result back to the same variable (e.g., <code>counter += 10</code> is equivalent to <code>counter = counter + 10</code>). This operator also serves a dual functionality by performing string concatenation in-place. The dual functionality of the <code>+=</code> operator for both numeric addition and string concatenation highlights Python's pragmatic flexibility but requires careful attention to data types to avoid errors. While this dual use provides syntactic conciseness, it can be a source of confusion for beginners if they attempt to use it with incompatible types (e.g., <code>int += string</code>). Python's strong typing will raise a <code>TypeError</code> in such cases rather than implicitly converting types. Therefore, it is important to ensure type compatibility when using <code>+=</code> to prevent common errors, reinforcing the concept of strong typing.
          </li>
        </ul>
        <p className="mt-3">
          Other compound assignment operators, such as <code>-=</code>, <code>*=</code>, and <code>/=</code>, follow a similar pattern, combining an arithmetic operation with assignment.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.4.3 Comparison Operators</h3>
        <p>
          These operators compare two values and return a Boolean (<code>True</code> or <code>False</code>) result:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li><code>{'>'}</code>: Greater than</li>
          <li><code>{'<'}</code>: Less than</li>
          <li><code>{'>='}</code>: Greater than or equal to</li>
          <li><code>{'<='}</code>: Less than or equal to</li>
          <li><code>==</code>: Equal to</li>
          <li><code>!=</code>: Not equal to</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.4.4 Logical Operators</h3>
        <p>
          Logical operators combine conditional statements:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li><code>and</code>: Returns <code>True</code> if both operands are <code>True</code>.</li>
          <li><code>or</code>: Returns <code>True</code> if at least one operand is <code>True</code>.</li>
          <li><code>not</code>: Reverses the logical state of its operand.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.4.5 Identity Operators</h3>
        <p>
          Identity operators compare the memory locations of two objects:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li><code>is</code>: Returns <code>True</code> if both variables refer to the same object.</li>
          <li><code>is not</code>: Returns <code>True</code> if both variables do not refer to the same object.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.4.6 Membership Operators</h3>
        <p>
          Membership operators test for the presence of a value within a sequence:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li><code>in</code>: Returns <code>True</code> if a specified value is found in the sequence.</li>
          <li><code>not in</code>: Returns <code>True</code> if a specified value is not found in the sequence.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.4.7 Bitwise Operators</h3>
        <p>
          Bitwise operators perform operations on individual bits of integers:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li><code>&</code>: Bitwise AND</li>
          <li><code>|</code>: Bitwise OR</li>
          <li><code>^</code>: Bitwise XOR</li>
          <li><code>~</code>: Bitwise NOT (complement)</li>
          <li><code>{'<<'}</code>: Left Shift</li>
          <li><code>{'>>'}</code>: Right Shift</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Table: Python Built-in Data Types Overview</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Type Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Mutability</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2"><code>int</code></td>
                <td className="px-4 py-2">Whole numbers (positive, negative, or zero) without fractional parts.</td>
                <td className="px-4 py-2">Immutable</td>
                <td className="px-4 py-2"><code>age = 30</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>float</code></td>
                <td className="px-4 py-2">Real numbers with a decimal point.</td>
                <td className="px-4 py-2">Immutable</td>
                <td className="px-4 py-2"><code>pi = 3.14159</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>complex</code></td>
                <td className="px-4 py-2">Complex numbers with a real and imaginary part.</td>
                <td className="px-4 py-2">Immutable</td>
                <td className="px-4 py-2"><code>c = 2 + 7j</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>bool</code></td>
                <td className="px-4 py-2">Boolean truth values: True or False.</td>
                <td className="px-4 py-2">Immutable</td>
                <td className="px-4 py-2"><code>is_active = True</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>str</code></td>
                <td className="px-4 py-2">Ordered, immutable sequence of Unicode characters.</td>
                <td className="px-4 py-2">Immutable</td>
                <td className="px-4 py-2"><code>name = "Python"</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>list</code></td>
                <td className="px-4 py-2">Ordered, mutable collection of items; elements can be of different types.</td>
                <td className="px-4 py-2">Mutable</td>
                <td className="px-4 py-2"><code>numbers = [1, 2, 3]</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>tuple</code></td>
                <td className="px-4 py-2">Ordered, immutable collection of items; similar to lists but cannot be modified after creation.</td>
                <td className="px-4 py-2">Immutable</td>
                <td className="px-4 py-2"><code>coordinates = (10, 20)</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>set</code></td>
                <td className="px-4 py-2">Unordered collection of unique items.</td>
                <td className="px-4 py-2">Mutable</td>
                <td className="px-4 py-2"><code>unique_ids = {1, 2, 3}</code></td>
              </tr>
              <tr>
                <td className="px-4 py-2"><code>dict</code></td>
                <td className="px-4 py-2"><code>person = {`{"name": "Alice", "age": 25}`}</code></td>
                <td className="px-4 py-2">Mutable</td>
                <td className="px-4 py-2"><code>person = {`{"name": "Alice", "age": 25}`}</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Table: Common Python Operators</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Operator Symbol</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2"><code>+</code></td>
                <td className="px-4 py-2">Arithmetic</td>
                <td className="px-4 py-2">Addition; also string concatenation.</td>
                <td className="px-4 py-2"><code>5 + 3</code> (8), <code>"Hello" + "World"</code> ("HelloWorld")</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>-</code></td>
                <td className="px-4 py-2">Arithmetic</td>
                <td className="px-4 py-2">Subtraction.</td>
                <td className="px-4 py-2"><code>10 - 4</code> (6)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>*</code></td>
                <td className="px-4 py-2">Arithmetic</td>
                <td className="px-4 py-2">Multiplication.</td>
                <td className="px-4 py-2"><code>6 * 7</code> (42)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>/</code></td>
                <td className="px-4 py-2">Arithmetic</td>
                <td className="px-4 py-2">Division (returns float).</td>
                <td className="px-4 py-2"><code>10 / 3</code> (3.33...)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>%</code></td>
                <td className="px-4 py-2">Arithmetic</td>
                <td className="px-4 py-2">Modulus (remainder of division).</td>
                <td className="px-4 py-2"><code>10 % 3</code> (1)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>**</code></td>
                <td className="px-4 py-2">Arithmetic</td>
                <td className="px-4 py-2">Exponentiation.</td>
                <td className="px-4 py-2"><code>2 ** 3</code> (8)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>=</code></td>
                <td className="px-4 py-2">Assignment</td>
                <td className="px-4 py-2">Assigns a value to a variable.</td>
                <td className="px-4 py-2"><code>x = 10</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>+=</code></td>
                <td className="px-4 py-2">Assignment</td>
                <td className="px-4 py-2">Adds value to variable and assigns result.</td>
                <td className="px-4 py-2"><code>count += 1</code> (same as <code>count = count + 1</code>)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>==</code></td>
                <td className="px-4 py-2">Comparison</td>
                <td className="px-4 py-2">Checks if two values are equal.</td>
                <td className="px-4 py-2"><code>x == 10</code> (True if x is 10)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>!=</code></td>
                <td className="px-4 py-2">Comparison</td>
                <td className="px-4 py-2">Checks if two values are not equal.</td>
                <td className="px-4 py-2"><code>x != 5</code> (True if x is not 5)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>{'>'}</code></td>
                <td className="px-4 py-2">Comparison</td>
                <td className="px-4 py-2">Checks if left operand is greater than right.</td>
                <td className="px-4 py-2"><code>10 {'>'} 5</code> (True)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>{'<'}</code></td>
                <td className="px-4 py-2">Comparison</td>
                <td className="px-4 py-2">Checks if left operand is less than right.</td>
                <td className="px-4 py-2"><code>5 {'<'} 10</code> (True)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>{'>='}</code></td>
                <td className="px-4 py-2">Comparison</td>
                <td className="px-4 py-2">Checks if left operand is greater than or equal to right.</td>
                <td className="px-4 py-2"><code>10 {'>='} 10</code> (True)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>{'<='}</code></td>
                <td className="px-4 py-2">Comparison</td>
                <td className="px-4 py-2">Checks if left operand is less than or equal to right.</td>
                <td className="px-4 py-2"><code>5 {'<='} 10</code> (True)</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>and</code></td>
                <td className="px-4 py-2">Logical</td>
                <td className="px-4 py-2">Logical AND.</td>
                <td className="px-4 py-2"><code>(x {'>'} 0) and (x {'<'} 10)</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>or</code></td>
                <td className="px-4 py-2">Logical</td>
                <td className="px-4 py-2">Logical OR.</td>
                <td className="px-4 py-2"><code>(x {'<'} 0) or (x {'>'} 10)</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>not</code></td>
                <td className="px-4 py-2">Logical</td>
                <td className="px-4 py-2">Logical NOT.</td>
                <td className="px-4 py-2"><code>not is_active</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>is</code></td>
                <td className="px-4 py-2">Identity</td>
                <td className="px-4 py-2">Checks if two variables refer to the same object.</td>
                <td className="px-4 py-2"><code>a is b</code></td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2"><code>in</code></td>
                <td className="px-4 py-2">Membership</td>
                <td className="px-4 py-2">Checks if a value is present in a sequence.</td>
                <td className="px-4 py-2"><code>'a' in 'banana'</code> (True)</td>
              </tr>
              <tr>
                <td className="px-4 py-2"><code>&</code></td>
                <td className="px-4 py-2">Bitwise</td>
                <td className="px-4 py-2">Bitwise AND.</td>
                <td className="px-4 py-2"><code>5 & 3</code> (1)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Exercise
          question="What is the result of the Python expression `7 % 3`?"
          correctAnswer="1"
        />
        <Quiz
          questions={[
            {
              question: "Which operator is used to check if two values are NOT equal?",
              options: ["==", "!=", ">=", "<="],
              correctAnswerIndex: 1,
            },
            {
              question: "What does the `in` operator do in Python?",
              options: ["Checks if two variables are identical", "Checks if a value is present in a sequence", "Performs bitwise AND", "Raises a number to a power"],
              correctAnswerIndex: 1,
            },
          ]}
        />
      </Section>
    </div>
  );
};

export default App;


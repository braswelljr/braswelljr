import React from "react";
import user from "../assets/53278231.jpg";
import resume from "../assets/braswelljrresume.pdf";

const Home = () => {
  const techStack = {
    language: [`Javascript`, `PHP`, `C++`, `Python`],
    frameworks: [`Vue`, `React`, `Laravel`, `Django`]
  };

  const contacts = {
    phone: [`+233500181106`, `+233540732749`],
    email: [
      `braswellkenneth7@gmail.com`,
      `linkedin.com/in/braswell-kenneth870827192`,
      `github.com/braswelljr`
    ]
  };
  return (
    <div className="w-full min-h-screen font-sans text-white bg-gray-800">
      <div className="px-10 py-4">
        <div className="flex justify-center mt-5">
          <img
            src={user}
            alt=""
            style={{ transform: `rotate(40deg)` }}
            className="w-auto rounded-full h-80"
          />
        </div>
        <div className="text-center">
          <h2 className="mt-10 text-2xl italic font-bold uppercase">
            Braswell Kenneth Azu Junior
          </h2>
          <h5 className="mt-2 italic">Software Engineer</h5>
        </div>
        <div className="text-gray-400 md:px-16 lg:px-36">
          <div className="mt-4 text-lg font-medium tracking-tight text-justify ">
            A Computer Science and Engineering student who has interest in
            building the world from code. Building and developing extensive
            softwares and user friendly interfaces for a better user experience.
          </div>
          <section className="mt-10">
            <div className="">
              <h3 className="text-xl font-bold text-center text-white uppercase">
                Tech Stack
              </h3>
              <div className="grid items-center w-full grid-cols-2 justify-items-center">
                <div className="">
                  <h4 className="text-yellow-100">Languages</h4>
                  <ul className="ml-6 list-disc">
                    {techStack.language.map((language, i) => (
                      <li key={i}>{language}</li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <h4 className="text-yellow-100">Frameworks</h4>
                  <ul className="ml-6 list-disc">
                    {techStack.frameworks.map((framework, i) => (
                      <li key={i}>{framework}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              <div className="flex flex-wrap items-center justify-around py-3 space-x-3">
                {contacts.email.map((email, i) => (
                  <a
                    target="_blank"
                    href={`https://${email}`}
                    rel="noreferrer"
                    className="text-red-200"
                    key={i}
                  >
                    {email}
                  </a>
                ))}
              </div>
              <div className="">
                <div className="text-center">
                  {contacts.phone.map((phone, i) => (
                    <div className="" key={i}>
                      {phone}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <p className="mt-5 text-center">
            Checkout my{" "}
            <a
              href={resume}
              download
              className="font-medium text-green-400 uppercase"
            >
              Resume
            </a>
          </p>
        </div>
        <div className="mt-10 text-xl text-center">
          Braswelljr &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Home;

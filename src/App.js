import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import SubjectsContent from "./Components/Content/SubjectsContent";
import SiderMenu from "./Components/Sider/SiderMenu";
import StudentsContent from "./Components/Content/StudentsContent";
import TopHeader from "./Components/Header/TopHeader";
import HomeContent from "./Components/Content/HomeContent";
import EndFooter from "./Components/Footer/EndFooter";
import Login from "./Components/Login/Login";
import "./index.css";

import { HomeOutlined } from "@ant-design/icons";
import RegistersContent from "./Components/Content/RegistersContent";

function App() {
  const [selectedSection, setSelectedSection] = useState({
    key: "1",
    icon: <HomeOutlined />,
    label: "Home",
  });

  const [email, setemail] = useState("");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Routes>
          <Route
            path="/"
            element={<Login setemail={setemail} email={email} />}
          />
          <Route
            path="/app/*"
            element={
              <>
                <SiderMenu
                  onSectionChange={handleSectionChange}
                  selectedSection={selectedSection}
                />
                <Layout>
                  <TopHeader selectedSection={selectedSection} email={email} />
                  <Routes>
                    <Route
                      path="/home"
                      element={
                        <HomeContent onSectionChange={handleSectionChange} />
                      }
                    />
                    <Route
                      path="/subjects"
                      element={
                        <SubjectsContent
                          onSectionChange={handleSectionChange}
                        />
                      }
                    />
                    <Route
                      path="/students"
                      element={
                        <StudentsContent
                          onSectionChange={handleSectionChange}
                        />
                      }
                    />
                    <Route
                      path="/registers"
                      element={
                        <RegistersContent
                          onSectionChange={handleSectionChange}
                        />
                      }
                    />
                  </Routes>
                  <EndFooter />
                </Layout>
              </>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

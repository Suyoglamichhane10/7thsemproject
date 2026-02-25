import React from "react";

const Navbar = () => {

  const styles = {
    navbar: {
      backgroundColor: "#1d4ed8",
      color: "white",
      height: "60px",
      padding: "0 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      margin: 0,
    },
    linkContainer: {
      display: "flex",
      gap: "20px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
    }
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>StudyNep</h2>
      <div style={styles.linkContainer}>
        <a href="#" style={styles.link}>Profile</a>
        <a href="#" style={styles.link}>Logout</a>
      </div>
    </nav>
  );
};

export default Navbar;
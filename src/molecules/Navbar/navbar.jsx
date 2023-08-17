"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";


const Navbar = () => {

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Lonuge Key
      </Link>
      <div className={styles.links}>
          <Link  href="#" className={styles.link}>
            Customer support
          </Link>
          <Link  href="#"  className={styles.link}>
            Sales enquiries
          </Link>
          <Link  href="#"  className={styles.link}>
          Create Your Account
          </Link>
          <button className={""} onClick={signOut}>
            Logout
          </button>
      </div>
    </div>
  );
};

export default Navbar;
"use client";
import React, { useState, useEffect } from "react";
function Signups() {
  return (
    <div>
      <p>Sign up page </p>
      <form>
        <input
          type="text"
          placeholder="Search for a word, a tag or a username"
          className="search_input peer"
        />
      </form>
    </div>
  );
}

export default Signups;

import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Search({ categories }) {
  const [state, setState] = useState({
    item: "All", // category
    query: "",   // search keyword
    results: [], // search results
  });

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSelect = (field) => ({ key }) => {
    setState((prev) => ({ ...prev, [field]: key }));
  };

  const handleSearch = async (q = state.query) => {
    if (!q.trim()) {
      setState((prev) => ({ ...prev, results: [] }));
      return;
    }
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_ADMIN}/products/search`, {
        params: {
          category: state.item,
          q,
        },
      });
      setState((prev) => ({ ...prev, results: res.data.data }));
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // 🔑 debounce search (runs on keyup)
  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch(state.query);
    }, 400);
    return () => clearTimeout(delay);
  }, [state.query, state.item]);

  // 🔑 Submit (button click) → redirect
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (state.query.trim()) {
      navigate(`/product/${state.query}`);
      setState((prev) => ({ ...prev, query: "", results: [] }));
      if (inputRef.current) inputRef.current.focus();
    }
  };

  // 🔑 Click result → clear input + focus
  const handleResultClick = () => {
    setState((prev) => ({ ...prev, query: "", results: [] }));
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <form className="bb-btn-group-form search-area" onSubmit={handleSearchSubmit}>
      <Dropdown
        overlay={
          <Menu
            onClick={handleSelect("item")}
            className="select-options bb-dropdown-location"
          >
            <MenuItem key="All">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.category}>{cat.category}</MenuItem>
            ))}
          </Menu>
        }
        trigger={["click"]}
        animation="slide-up"
      >
        <div className="inner-select location-dark">
          <div className="custom-select">
            {state.item}
            <i style={{ fontSize: "30px" }} className="ri-arrow-drop-down-line"></i>
          </div>
        </div>
      </Dropdown>

      <input
        ref={inputRef}
        className="form-control bb-search-bar"
        placeholder="Search products..."
        type="text"
        value={state.query}
        onChange={(e) =>
          setState((prev) => ({ ...prev, query: e.target.value }))
        }
      />

      <button className="submit" type="submit">
        <i className="ri-search-line"></i>
      </button>

      {/* Search Results */}
      <div className="search-list">
        <div className="list-area">
          {state.results.length > 0 ? (
            state.results.map((p) => (
              <Link
                key={p._id}
                to={`/productdetails/${p.url}`}
                onClick={handleResultClick}
              >
                <h6>{p.productname}</h6>
              </Link>
            ))
          ) : (
            state.query && <h6>No results found</h6>
          )}
        </div>
      </div>
    </form>
  );
}

export default Search;

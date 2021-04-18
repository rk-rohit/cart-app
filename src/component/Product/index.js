import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from "@material-ui/core/styles";
import { addToCart } from "../../actions/product";
import Cart from "../cart";
import { useState } from "react";
import Card from "../Product/Card";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    border: "1px solid",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    margin: "0 !important",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  marginTop: {
    marginTop: "75px",
  },
  card: {
    display: "inline-block",
    marginBottom: "20px"
  },
  gridFlex: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const Product = ({ handleOpen }) => {
  const { cartItem, product } = useSelector(
    (store) => ({
      cartItem: store.cart.cartItem,
      product: store.product.product_list,
    }),
    shallowEqual
  );

  const [filteredProduct, setFilteredProduct] = useState(product);
  const [sortByDur, setSortByDur] = useState(false);
  const [sortByDat, setSortByDat] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const addCart = (id) => {
    const availableCartItem = cartItem ? cartItem : [];
    let alreadyExist = availableCartItem?.find((item) => item.id === id);
    const updateItem = alreadyExist
      ? availableCartItem
      : [
          ...availableCartItem,
          {
            id: id,
            qty: 1,
          },
        ];

    localStorage.setItem("cartItem", JSON.stringify(updateItem));
    dispatch(addToCart(updateItem));
  };

  const search = (e) => {
    const val = e.target.value;
    const filterItem = product
      ? product.filter((item) => {
          const name = item.name.toLowerCase();
          const description = item.description.toLowerCase();
          const author = item.author.toLowerCase();
          if (
            name.includes(val.toLowerCase()) ||
            description.includes(val.toLowerCase()) ||
            author.includes(val.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
      : product;
    setFilteredProduct(filterItem);
  };

  const hmsToSeconds = (duration) => {
    const hms = duration.split(":");
    return +hms[0] * 60 * 60 + +hms[1] * 60 + +hms[2];
  };

  const sortByDuration = () => {
    const filterItem = [...product].sort(function (a, b) {
      return !sortByDur
        ? hmsToSeconds(b.duration) - hmsToSeconds(a.duration)
        : hmsToSeconds(a.duration) - hmsToSeconds(b.duration);
    });
    setSortByDur(!sortByDur);
    setSortByDat(false);
    setFilteredProduct(filterItem);
  };

  const convertIntoDate = (dateString) => {
    const dateParts = dateString.split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  };
  const sortByDate = () => {
    const filterItem = [...product].sort(function (a, b) {
      return !sortByDat
        ? convertIntoDate(b.publishDate) - convertIntoDate(a.publishDate)
        : convertIntoDate(a.publishDate) - convertIntoDate(b.publishDate);
    });
    setSortByDat(!sortByDat);
    setSortByDur(false);
    console.log("filterItem", sortByDat, filterItem, product)
    setFilteredProduct(filterItem);
  };

  return (
    <Container className={classes.marginTop}>
      <Grid container>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onKeyUp={(e) => search(e)}
          />
          <Button color="primary" onClick={() => sortByDate()}>
            Sort By Date
          </Button>
          <Button color="primary" onClick={() => sortByDuration()}>
            Sort By Duration
          </Button>
        </div>
        <Grid item xs={12} sm={12} md={8} className={classes.gridFlex}>
          {filteredProduct.length
            ? filteredProduct.map((item) => (
                <Grid className={classes.card} xs={12} sm={6} md={4}>
                  <Card
                    {...item}
                    addCart={addCart}
                    cartItem={cartItem}
                    handleOpen={handleOpen}
                  />
                </Grid>
              ))
            : "No Product"}
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} sm={4} md={4}>
            <Cart />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

export default Product;

import React from "react";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import Toolbar from "@mui/material/Toolbar";
import { Button, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishlist, fetchWishlist, setLoading } from "../../redux/wishlist";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import WishlistLoading from "../loading/WishlistLoading";

const Wishlist = ({ wishlist, data, setWishlist, handleChange, handleOpen, setSuccess }) => {
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })

  const wishlistAmbil = useSelector((state) => state.wishlist.wishlist)

  const handleDelete = (id) => {
    dispatch(deleteWishlist(id)).then((res) => res.payload.success && dispatch(fetchWishlist()))
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 1500);
  }

  function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
  }

  const toDate = (datenow) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date(datenow)
    return (date.getDate() + " " + months[date.getMonth()] + ", " + addZero(date.getHours()) + ":" + addZero(date.getMinutes()))
  }

  const loading = useSelector(state => state.wishlist.loading)
  
  React.useEffect(() => {
    dispatch(fetchWishlist());
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 1500);
  }, [dispatch])
  
  return (
    <Box width={{ md: "70%", xs: "100%" }} mx={"auto"} mt={3}>
      <Toolbar position="relative">
        <Link to={-1}>
          <ArrowBackSharpIcon sx={{
            display: { md: 'block', xs: 'none' }, borderRadius: '50px', background: 'white',color: 'purple'
            , zIndex: 100, padding: 1, cursor: 'pointer', '&:hover': {
              opacity: [0.9, 0.8, 0.7],
              color: 'blue'
            }
          }} />
        </Link>
        <Box
          component={"div"}
          position="absolute"
          width={{ lg: "60%", md: "70%", sm: "70%", xs: "80%" }}
          mx={"auto"}
          sx={{ left: 0, right: 0, top: 0 }}
        >
          {loading ? <WishlistLoading length={Object.keys(wishlistAmbil).length}/> :
          Object.keys(wishlistAmbil).length !== 0
            ? wishlistAmbil.map((res, index) => {
              return (

                <Box
                  component={"div"}
                  rowGap={2}
                  key={index}
                  display={"flex"}
                  mt={2}
                  sx={{
                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)",
                    borderRadius: "16px",
                    position: 'relative',
                    width: '100%'
                  }}
                >
                  <Typography variant="caption" sx={{ padding: .5, display: res.product.isSold ? 'block' : 'none', color: 'white', background: 'grey', fontSize: '.8em', position: 'absolute', borderTopLeftRadius: '16px' }}>
                    Terjual
                  </Typography>
                  <Box p={2} width={'100%'}>
                    <Grid container my={1} p={1}>
                      <Grid
                        item
                        xs={1}
                        md={1}
                        display={"flex"}
                        textAlign={"center"}
                        alignItems={"center"}
                      >
                        <IconButton onClick={() => handleDelete(res.id)}>
                            <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        md={4}
                        display={"flex"}
                        textAlign={"center"}
                        alignItems={"center"}
                        justifyContent={'center'}
                      >
                        <Box
                          component={"img"}
                          src={res.product.images ? `https://be-kel1.herokuapp.com/public/images/${res.product.images[0]}` : ''}
                          sx={{ height: "auto", maxHeight:"75px", width: "90px", borderRadius: "16px", objectFit: 'contain', textAlign:'center' }}
                        />
                      </Grid>
                      <Grid item xs={4} md={3}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={550}
                          my={0}
                          fontSize={{ md: "1rem", xs: ".8rem" }}
                          sx={{ maxWidth:'200px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}
                        >
                          {res.product.name ? res.product.name : ''}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={550}
                          my={0}
                          fontSize={{ md: "1rem", xs: ".8rem" }}
                          sx={{ maxWidth:'200px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}
                        >
                          {res.product.price ? formatter.format(res.product.price) : ''}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} md={4} textAlign="center" display={'flex'} flexDirection={'column'} gap={1}> 
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="h2"
                          fontSize={{ md: ".8rem", xs: ".6rem" }}
                          sx={{ maxWidth:'200px',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden' }}
                        >
                          {res.createdAt ? toDate(res.createdAt) : ''}
                        </Typography>
                        <Link to={`/detail-product-buyer/${res.productId ? res.productId : ''}`} style={{ textDecoration: 'none' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              height: "25px",
                              borderRadius: "25px",
                              fontSize:{ md: ".8rem", xs: ".4rem" }
                            }}
                          >
                            Lihat Produk
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )
            })

            :
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography>
                Wishlist Kosong
              </Typography>
            </Box>
          }
        </Box>
      </Toolbar>
    </Box>
  )
};

export default Wishlist;

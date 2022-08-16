import { Card, CardActionArea, CardContent, Grid, Skeleton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const CardLoading = ({ length, md, xl }) => {
    var rows = [];
    for (var i = 0; i <  length; i++) {
        rows.push(
                <Grid key={i} item xs={6} sm={6} md={md} xl={xl}  >
                    <Card sx={{ maxWidth: 345, height: '100%' }}>
                        <CardActionArea sx={{ height: '100%' }}>
                            <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
                            <CardContent>
                                <Skeleton animation="wave" height={20} sx={{ marginBottom: 2 }} />
                                <Skeleton animation="wave" height={20} sx={{ marginBottom: 2 }} />
                                <Skeleton animation="wave" height={20} sx={{ marginBottom: 2 }} />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )
    }

return (
    <>
        {rows}
    </>
)
}

export default CardLoading
import React, { useState } from "react";
import { Box } from "@mui/material";
import { Parallax } from "react-parallax";
import Header from "./Header";
import Banner from "./Banner";
import FeaturedProperties from "./FeaturedProperties";
import WhyChooseUs from "./WhyChooseUs";
import Footer from "./Footer";
import PropertyList from '../property/PropertyList';

const Home = () => {
    const [filters, setFilters] = useState({
        location: '',
        type: '',
        maxPrice: ''
    });
    const [showResults, setShowResults] = useState(false);

    const handleBannerSearch = (searchFilters) => {
        setFilters(searchFilters);
        setShowResults(true);
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Parallax strength={300}>
                <Banner onSearch={handleBannerSearch} />
            </Parallax>
            {showResults && (
                <Box mb={6} px={2}>
                    <PropertyList filters={filters} />
                </Box>
            )}
            <FeaturedProperties />
            <WhyChooseUs />
            <Footer />
        </Box>
    );
};

export default Home;
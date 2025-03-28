import React, { useState } from 'react';
import { InputBase, Box, AppBar, Toolbar, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WidgetsIcon from '@mui/icons-material/Widgets';
import MapIcon from '@mui/icons-material/Map';
import MapComponent from './MapComponent';
import InfoHeader from './InfoHeader';

const StyledAppBar = styled(AppBar)`
    background: rgb(41, 84, 58);
    height: 100px;
`;

const Search = styled(Box)`
  background: rgb(184, 230, 199);
  margin-left: 50px;
  border-radius: 15px;
  width: 30%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const InputSearchBase = styled(InputBase)`
  width: 100%;
  padding-left: 10px;
`;

const ToolbarStyled = styled(Toolbar)`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;

const Header = ({ setQuery }) => {
    const [showMap, setShowMap] = useState(false);
    const [location, setLocation] = useState("India");
    const [searchTerm, setSearchTerm] = useState("");

    const handleMapClick = () => {
        setShowMap(!showMap);
    };

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            setQuery(searchTerm); // Pass search term to parent component
        }
    };

    return (
        <>
            <StyledAppBar position="static">
                <ToolbarStyled>
                    <WidgetsIcon sx={{ fontSize: 40 }} />
                    <Search>
                        <SearchIcon />
                        <InputSearchBase
                            placeholder="Search for news..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleSearch} // Trigger search on Enter key
                        />
                    </Search>
                    <MapIcon sx={{ fontSize: 50, cursor: 'pointer' }} onClick={handleMapClick} />
                </ToolbarStyled>
            </StyledAppBar>

            <InfoHeader location={location} />
            {showMap && <MapComponent setLocation={setLocation} />}
        </>
    );
};

export default Header;

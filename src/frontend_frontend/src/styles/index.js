export const selectStyles = {
    width: "100%",
    display: "flex",
    gap: "30px",
    justifyContent: "flex-start",
    fontFamily: "Noto Sans Mono",
    fontSize: "16px",
    fontWeight: "800",
    borderRadius: "8px",
    color: "white",
    backgroundColor: "black",
    border: "1px solid white",
    '& .MuiSelect-icon': {
        color: 'white',
    }, 
    '& .MuiSelect-select': {
        display: "flex !important",
        alignItems: "center !important",
        padding: "10 !important"
    },
    '& .MuiOutlinedInput-root': {
        padding: "0 !important",
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    }
}

export const menuProps = {
    disableScrollLock: true,
    PaperProps: {
        sx: {
        backgroundColor: '#1a1a1a',
        color: 'white',
        border: "1px solid white",
        borderRadius: "8px",
        padding: "0",
        margin: "0"
        },
    },
    MenuListProps: {
        sx: {
        padding: "0",
        },
    }
}

export const menuItemStyles = {
    display: "flex",
    alignItems: "center",
    color: "white",
    fontFamily: "Noto Sans Mono",
    fontSize: "16px",
    fontWeight: "800",
    backgroundColor: "#2b2b2b",
    padding: "10px",
    ":not(:last-child)": {
        borderBottom: "1px solid white"
    }
}

export const menuTokenItemStyles = {
    ...menuItemStyles,
    display: "flex",
    alignItems: "center"
}  
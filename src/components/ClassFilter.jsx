import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function ClassFilter(props) {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        if (event.target.value === null){
            setValue(null);
            sessionStorage.removeItem(props.name);
        }else{
            setValue(event.target.value);
        }
        sessionStorage.setItem(props.name, event.target.value);
    };

    const values = props.values.split(",");

    return (
        <div style={{display: 'inline-block', marginRight: '5%'}}>
            <InputLabel style={{color: 'white'}} id="demo-simple-select-label">{props.name.toUpperCase()}</InputLabel>
            <Select
                style={{ backgroundColor: 'white'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={null} disabled={value === null}>none</MenuItem>
                {values.map((subject) => (
                    <MenuItem value={subject}>{subject}</MenuItem>
                ))}

            </Select>
        </div>
    );
}
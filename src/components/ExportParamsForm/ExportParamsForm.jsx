import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
} from '@material-ui/core';

const ExportParamsForm = ({ exportParams }) => {
  const [params, setParam] = useState({});

  const handleSelect = (event) => {
    const { name, value } = event.target;
    setParam({ ...params, [name]: value });
  };

  const renderSwitchField = (param) => {
    const { schema } = param;
    if (schema.type) {
      switch (schema.type) {
        case 'boolean': {
          return <Checkbox />;
        }
      }
    } else if (schema.enum) {
      return (
        <Select
          name={param.name}
          style={{ marginTop: 0 }}
          value={params[param.name] || schema.default || ''}
          onChange={(e) => handleSelect(e)}
        >
          {schema.enum.map((value, index) => (
            <MenuItem key={`${value}${index}`} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      );
    } else {
      return <div>text input</div>;
    }
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {exportParams.map((param) => (
        <FormControl
          key={param.name}
          style={{ marginBottom: '1rem', marginTop: 0 }}
        >
          <FormLabel style={{ marginBottom: 0, fontSize: '0.8rem' }}>
            {param.schema.title}
          </FormLabel>
          {renderSwitchField(param)}
        </FormControl>
      ))}
    </form>
  );
};

export default ExportParamsForm;

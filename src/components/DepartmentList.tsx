import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  IconButton,
  ListItemIcon,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { departments } from '../data/departments';

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (departmentName: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [departmentName]: !prevOpen[departmentName],
    }));
  };

  const handleSelect = (departmentName: string, isSubDepartment = false) => {
    if (isSubDepartment) {
      setSelected((prevSelected) => ({
        ...prevSelected,
        [departmentName]: !prevSelected[departmentName],
      }));
    } else {
      const newSelected = { ...selected };
      const department = departments.find((d) => d.name === departmentName);
      if (department) {
        const isSelected = !selected[departmentName];
        newSelected[departmentName] = isSelected;
        department.subDepartments.forEach(
          (subDept) => (newSelected[`${departmentName}-${subDept}`] = isSelected)
        );
      }
      setSelected(newSelected);
    }
  };

  const isDepartmentSelected = (departmentName: string) => {
    const department = departments.find((d) => d.name === departmentName);
    if (department) {
      return (
        selected[departmentName] &&
        department.subDepartments.every(
          (subDept) => selected[`${departmentName}-${subDept}`]
        )
      );
    }
    return false;
  };

  const isSubDepartmentSelected = (departmentName: string, subDept: string) =>
    selected[`${departmentName}-${subDept}`];

  return (
    <List>
      {departments.map((department, index) => (
        <React.Fragment key={index}>
          <ListItem button onClick={() => handleToggle(department.name)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isDepartmentSelected(department.name)}
                tabIndex={-1}
                disableRipple
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(department.name);
                }}
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            <IconButton edge="end">
              {open[department.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[department.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDept, subIndex) => (
                <ListItem key={subIndex} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isSubDepartmentSelected(
                        department.name,
                        subDept
                      )}
                      tabIndex={-1}
                      disableRipple
                      onClick={() =>
                        handleSelect(`${department.name}-${subDept}`, true)
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;

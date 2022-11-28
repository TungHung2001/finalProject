import React from 'react'
import { NavLink } from 'react-router-dom'
import { Divider, Dropdown, Input, Menu } from 'semantic-ui-react'


const options = [
  { key: 1, text: 'Choice 1', value: 1 },
  { key: 2, text: 'Choice 2', value: 2 },
  { key: 3, text: 'Choice 3', value: 3 },
]
const MainNav = () => {
  return (
    <Menu secondary >
    <Menu.Item
      name='home'
     
      
    />
    <Menu.Item
      name='New'
      
      
    />
    
    <Menu.Item name='create post' as={NavLink} to='/createPost'/>
    <Menu.Item name='Post' as={NavLink} to='/post'/>
    <Menu.Item name='AdminPage' as={NavLink} to='/adminPage'/>
    <Menu.Menu position='right'>
      <Menu.Item>
      <Dropdown clearable options={options} selection style={{ marginRight: '8px' }}/>
      
      <Divider/>
        <Input icon='search' placeholder='Search...' />
      </Menu.Item>
     
    </Menu.Menu>
  </Menu>
  )
}

export default MainNav
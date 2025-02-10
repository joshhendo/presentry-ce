// Menu.tsx
import { slide as ReactBurgerMenu } from 'react-burger-menu';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '20px',
    height: '18px',
    left: '5px',
    top: '15px',
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const Menu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const itemClicked = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <ReactBurgerMenu
      pageWrapId="page-wrap"
      styles={styles}
      isOpen={open}>
      <div>
        <div
          id="home"
          className="menu-item"
          onClick={() => itemClicked('/')}>
          Home
        </div>
        <div
          id="settings"
          className="menu-item"
          onClick={() => itemClicked('/settings')}>
          Settings
        </div>
        <div
          id="add-passage"
          className="menu-item"
          onClick={() => itemClicked('/add/passage')}>
          + Add Passage
        </div>
        <div
          id="add-song"
          className="menu-item"
          onClick={() => itemClicked('/add/song')}>
          + Add Song
        </div>
      </div>
    </ReactBurgerMenu>
  );
};

export default Menu;

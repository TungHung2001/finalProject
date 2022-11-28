import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Icon} from 'semantic-ui-react';
import {createSearchParams, useNavigate, useSearchParams} from 'react-router-dom';

function SearchBox() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const q = search.get('q') || '';

  useEffect(() => {
    setKeyword(q);
  }, [q]);

  const onFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onChange = useCallback((e: any) => {
    setKeyword(e.target.value);
  }, []);

  const onKeyDown = useCallback((e: any) => {
    if (e.key === 'Escape') {
      if (keyword) {
        setKeyword('');
      } else {
        setIsOpen(false);
        if (inputRef.current && inputRef.current.blur) {
          inputRef.current.blur();
        }
      }
    } else if (e.key === 'Enter') {
      navigate({
        pathname: "search",
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  }, [keyword, navigate]);

  const handleClear = useCallback(() => {
    setKeyword('');
  }, []);

  return (
    <div
      className={`search-box ${isOpen || keyword ? 'open' : ''}`}
    >
      <input
        type="text"
        value={keyword}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
      {
        !keyword && <Icon name="search"/>
      }
      {
        !!keyword && <Icon name="close" onClick={handleClear}/>
      }
    </div>
  );
}

export default React.memo(SearchBox);

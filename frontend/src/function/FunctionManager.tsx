import React, { RefObject } from 'react';

export const handleOutsideClick = (
	e: any, refObject: RefObject<HTMLElement>, callback: () => void
) => {
	if (refObject.current && !refObject.current.contains(e.target)) {
		callback();
	}
};

export const checkIsStringEmpty = (str:string | undefined | null) => {
	if (!str || !str.trim()) return true;
	return false;
};

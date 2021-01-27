import React, { forwardRef, useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';

import {
	Window, TaskTitle, AttributeValuePair as Pair
} from '../Shared';
import { TaskObj } from '../Model';
import { getClickedEmojiIndex } from '../Shared/EmojiList';

type TaskViewProps = {
	open: boolean;
	task: TaskObj | undefined;
	handleTaskWindowClose: () => void;
}

const windowType = 'task';
const descType = 'description';
const descAttri = '설명';
const addButtonType = 'add-button';

/* ==========[ 임시 값들 ]========== */
const userName = '사용자';
const descValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.
Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus.`;
const emojisTempData = [
	{ id: 'woman-gesturing-ok', users: [userName] },
	{ id: 'heart_eyes', users: ['김철수'] }];
const pairTempData = [{ type: 'checkbox', name: '체크박스', value: true }];

const TaskView = forwardRef<HTMLDivElement, TaskViewProps>(({
	open, task, handleTaskWindowClose
}, ref) => {
	const [pin, setPin] = useState(false);
	const [emojis, setEmojis] = useState(emojisTempData);
	const [pairs, setPairs] = useState(pairTempData as any);

	// parsed data
	const mainTitle = `TASK #${task?.taskID}`;
	const attributes = task?.attribute;
	const created = task?.createdAt;
	const updated = task?.updatedAt;

	const handlePin = () => {
		setPin(!pin);
	};

	const handleEmojis = (emojiId: string) => {
		const index = getClickedEmojiIndex(emojis, emojiId);
		if (index !== -1) {
			const emojisData = emojis.slice();
			const clickedEmojiData = emojisData[index];
			if (clickedEmojiData.users.includes(userName)) {
				if (clickedEmojiData.users.length === 1) {
					const editedEmojisData =
						emojisData.filter((emojiData: any) => emojiData !== clickedEmojiData);
					setEmojis(editedEmojisData);
				} else {
					const editedUserData =
						clickedEmojiData.users.filter((user: string) => user !== userName);
					const editedEmojiData = { ...clickedEmojiData, users: editedUserData };
					emojisData[index] = editedEmojiData;
					setEmojis(emojisData);
				}
			} else {
				clickedEmojiData.users.push(userName);
				setEmojis(emojisData);
			}
		} else {
			setEmojis([...emojis, { id: emojiId, users: [userName] }]);
		}
	};

	const handlePairAdd = (pairToAdd: any) => {
		setPairs([...pairs, pairToAdd]);
	};

	const handlePairDelete = (indexToDelete: number) => {
		const editedPairs = pairs.filter((_: any, index: number) => index !== indexToDelete);
		setPairs(editedPairs);
	};

	const handlePairEdit = (indexToEdit: number, editedPair: any) => {
		const pairsData = pairs.slice();
		pairsData[indexToEdit] = editedPair;
		setPairs(editedPair);
	};

	useEffect(() => {
		console.log(pairs);
	}, [pairs]);

	return (
		<Grid ref={ref} className="taskview">
			<Window
				type={windowType}
				open={open}
				hasCloseBtn={true}
				handleWindowClose={handleTaskWindowClose}
			>
				<TaskTitle
					taskTitle={mainTitle}
					handleTitleChange={() => { }}
					pin={pin}
					handlePin={handlePin}
					emojis={emojis}
					handleEmojis={handleEmojis}
				/>
				<Grid className="task-attributes">
					{pairs.map((pair: any, index: number) => (
						<Pair
							index={index}
							type={pair.type}
							name={pair.name}
							value={pair.value}
							handlePairDelete={handlePairDelete}
						/>
					))}
					<Pair
						index={pairs.length + 1}
						type={addButtonType}
						handlePairAdd={handlePairAdd}
					/>
				</Grid>
				<Grid className="task-description">
					<Pair index={-1} type={descType} name={descAttri} />
					{descValue}
				</Grid>
			</Window>
		</Grid>
	);
});

TaskView.defaultProps = {
	task: undefined,
};

export default TaskView;
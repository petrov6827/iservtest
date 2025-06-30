import type { FC } from 'react';
import {Dialog} from '@mui/material';
import LoginForm from './LoginForm';

interface LoginModalProps {
	open: boolean;
	onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = (props) => {
	const { open, onClose } = props;

	return (
		<Dialog onClose={onClose} open={open}>
			<LoginForm />
		</Dialog>
	)
}
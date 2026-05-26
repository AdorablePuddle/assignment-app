import Login from "@/src/app/(auth)/login";
import { signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

jest.mock('@react-native-firebase/auth', () => ({
	getAuth: jest.fn(() => ({ currentUser: null })),
	signInWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
}));

jest.mock('expo-router', () => ({
	useRouter: () => ({ push: jest.fn() }),
}));

describe("<Login />", () => {
	// Basic test
	test("There exists an email field.", () => {
		render(<Login />);
		screen.getByPlaceholderText("Email");
	});
	test("There exists a password field.", () => {
		render(<Login />);
		screen.getByPlaceholderText("Password");
	});
	test("There exists an enabled login button.", () => {
		render(<Login />);
		const login_button = screen.getByTestId("login_button");
		expect(login_button).not.toBeDisabled();
	});
	test("There exists an enabled register button.", () => {
		render(<Login />);
		const register_button = screen.getByTestId("register_button");
		expect(register_button).not.toBeDisabled();
	});
	test("There exists an enabled guest button.", () => {
		render(<Login />);
		const guest_button = screen.getByTestId("guest_button");
		expect(guest_button).not.toBeDisabled();
	});

	// Advanced test
	test("Advanced -- Password field must be private.", () => {
		render(<Login />);
		const password_field = screen.getByPlaceholderText("Password");
		expect(password_field.props.secureTextEntry).toBe(true);
	});

	test("Advanced -- Login button cause a warning to pop up when inputting blank.", async () => {
		render(<Login />);
		const login_button = screen.getByTestId("login_button");

		fireEvent.press(login_button);
		
		const text = await screen.findByText("Email or password needed.");
		expect(text).toBeOnTheScreen();
	});

	test("Advanced -- Checked for input call.", async () => {
		render(<Login />);
		const testEmail    = "koharuwatabiki@madomail.com";
		const testPassword = "iwanttobecute";

		const emailInput = screen.getByPlaceholderText("Email");
		const passwordInput =  screen.getByPlaceholderText("Password");
		const loginButton = screen.getByTestId("login_button");

		fireEvent.changeText(emailInput, testEmail);
		fireEvent.changeText(passwordInput, testPassword);
		fireEvent.press(loginButton);

		await waitFor(() => {
			expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
				expect.any(Object),
				testEmail,
				testPassword
			);
		});

		expect(screen.queryByText(/incorrect/i)).toBeNull();
	});
})
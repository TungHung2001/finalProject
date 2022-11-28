import React from "react";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import useQuery from "../../app/common/util/hooks";

export default function RegisterSuccess() {
    const email = useQuery().get('email') as string;

    function handleConfirmEmailResend() {
        agent.Account.resendEmailConfirmation(email).then(() => {
            toast.success('Verification email resent');
        }).catch(error => console.log(error));
    }

    return (
        <Segment placeholder textAlign="center">
            <Header icon color="blue">
                <Icon name="check"/>
                Successfully registered!
            </Header>
            <p>Please check your email for verification email</p>
            {email &&
                <>
                    <p>Didn't receive the email? Click the below button to resend</p>
                    <Button primary onClick={handleConfirmEmailResend} content="Resend Email" size="huge"/>
                </>
            }
        </Segment>
    )
}
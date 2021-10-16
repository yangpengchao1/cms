import {Modal} from "antd";
import {PropsWithChildren} from "react";

const ModalPad = (props: PropsWithChildren<any>) => {

    const {title, visible, onCancel} = props;

    return (
        <Modal
            destroyOnClose={true}
            visible={visible}
            title={title}
            onCancel={onCancel}
            footer={null}
        >
            {props.children}
        </Modal>
    );
}

export default ModalPad;
import React, { useEffect, useState } from "react";
// import { flushSync } from 'react-dom'
import { useDispatch, useSelector } from "react-redux";
import { baiTapFormActions } from "../store/baiTapForm/slice";

const ProductForm = () => {
    const [formValue, setFormValue] = useState();
    const [formError, setFormError] = useState();
    const [searchValue, setSearchValue] = useState();

    const { productEdit } = useSelector((state) => state.baiTapForm);

    const dispatch = useDispatch();

    const validate = (element) => {
        const { validity, minLength, title, value } = element;

        const { valueMissing, tooShort, patternMismatch } = validity;

        let mess = "";

        if (valueMissing) {
            mess = `Vui lòng nhập ${title}`;
        } else if (tooShort || value.length < minLength) {
            mess = `Vui lòng nhập ${title} tối thiểu ${minLength} ký tự`;
        } else if (patternMismatch) {
            mess = `Vui lòng nhập đúng ${title}`;
        }
        return mess;
    };

    const handleFormValue = () => (ev) => {
        const { name, value } = ev.target;
        let mess = validate(ev.target);

        setFormError({
            ...formError,
            [name]: mess,
        });

        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    useEffect(() => {
        if (productEdit) {
            setFormValue(productEdit);
        }
    }, [productEdit]);

    console.log("RENDER");
    return (
        <div>
            <form
                noValidate
                onSubmit={(ev) => {
                    ev.preventDefault();

                    const elements = document.querySelectorAll("input");

                    let errors = {};
                    elements.forEach((ele) => {
                        const { name } = ele;
                        errors[name] = validate(ele);
                    });
                    setFormError(errors);
                    let isFlag = false;
                    for (let key in errors) {
                        if (errors[key]) {
                            isFlag = true;
                            break;
                        }
                    }
                    if (isFlag) return;

                    if (!productEdit) {
                        dispatch(baiTapFormActions.addProduct(formValue));
                    } else {
                        dispatch(baiTapFormActions.updateProduct(formValue));
                    }

                    console.log("submit");
                }}
            >
                <h2 className="p-4 bg-dark text-warning rounded">
                    Thông tin sinh viên
                </h2>
                <div className="mt-3 row">
                    <div className="col-6 text-start mt-3">
                        <p>Mã SV</p>
                        <input
                            type="text"
                            className="form-control"
                            name="id"
                            title="mã sinh viên"
                            disabled={!!productEdit}
                            value={formValue?.id || ""}
                            required
                            minLength={5}
                            onChange={handleFormValue()}
                        />
                        {formError?.id && (
                            <p className="text-danger">{formError?.id}</p>
                        )}
                    </div>
                    <div className="col-6 text-start mt-3">
                        <p>Họ tên</p>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            title="tên sinh viên"
                            required
                            value={formValue?.name || ""}
                            onChange={handleFormValue()}
                            pattern='^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
                        />
                        {formError?.name && (
                            <p className="text-danger">{formError?.name}</p>
                        )}
                    </div>
                    <div className="col-6 text-start mt-3">
                        <p>Số điện thoại</p>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            title="số điện thoại"
                            value={formValue?.phone || ""}
                            onChange={handleFormValue()}
                            required
                            minLength={10}
                            pattern="^[0-9]+$"
                        />
                        {formError?.phone && (
                            <p className="text-danger">{formError?.phone}</p>
                        )}
                    </div>
                    <div className="col-6 text-start mt-3">
                        <p>Email</p>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            title="email"
                            value={formValue?.email || ""}
                            onChange={handleFormValue()}
                            required
                            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
                        />
                        {formError?.email && (
                            <p className="text-danger">{formError?.email}</p>
                        )}
                    </div>
                </div>
                <div className="my-3 d-flex gap-3">
                    {productEdit ? (
                        <button className="btn btn-info">Cập nhật</button>
                    ) : (
                        <button className="btn btn-success">
                            Thêm sinh viên
                        </button>
                    )}
                </div>
            </form>
            <div className="search text-start d-flex gap-3">
                <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="Nhập tên SV cần tìm"
                    value={searchValue || ''}
                    style={{ width: 600 }}
                    onChange={(ev)=>{setSearchValue(ev.target.value)}}
                />
                <button
                    className="btn btn-warning mt-3" id="btnSeach"
                    onClick={()=>{dispatch(baiTapFormActions.searchProduct(searchValue))}}
                >
                    Tìm kiếm
                </button>
            </div>
        </div>
    );
};

export default ProductForm;

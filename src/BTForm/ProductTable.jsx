import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormActions } from '../store/baiTapForm/slice'

const ProductTable = () => {
    const { productList, productSearch } = useSelector((state) => state.baiTapForm)
    console.log('productList', productList)
    console.log('productSearch', productSearch)
    console.log('result', productSearch ? 'grg' : productList)

    const dispatch = useDispatch()

    return (
        <div className="mt-3">
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(productSearch ? productSearch : productList).map((prd) => (
                        <tr key={prd?.id}>
                            <td>{prd?.id}</td>
                            <td>{prd?.name}</td>
                            <td>{prd?.phone}</td>
                            <td>{prd?.email}</td>
                            <td>
                                <div className="d-flex gap-3">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            dispatch(baiTapFormActions.editProduct(prd))
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            dispatch(baiTapFormActions.deleteProduct(prd.id))
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable

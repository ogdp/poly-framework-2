import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/client/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* <Route index element={<Content />} />
      <Route
        path="products/"
        element={<ClientProductListPage getAllProduct={getAllProduct} />}
      /> */}
      </Route>
      {/* <Route path="auth" element={<SigninPage />}>
    </Route> */}
      {/* <Route path="/admin" element={<DashBoard />}>
      <Route index element={<Content />} />
      <Route path="products">
        <Route
          index
          element={
            <AdminProductListPage
              getProduct={getAllProduct}
              remove={removeProduct}
              getCategory={getAllCategory}
            />
          }
        />
        <Route
          path="add"
          element={
            <ProductAdd
              createProduct={handleAddProduct}
              getAllCategory={getAllCategory}
            />
          }
        />
        <Route
          path="update/:id"
          element={
            <ProductUpdate
              getOneProduct={getOneProduct}
              getAllCategory={getAllCategory}
              updateProduct={updateProduct}
            />
          }
        />
        <Route
          path="category"
          element={
            <CategoryList
              getAllCategory={getAllCategory}
              removeCategory={removeCategory}
              getOneCategory={getOneCategory}
              createCategory={createCategory}
            />
          }
        >
          <Route
            index
            element={
              <CategoryAdd
                getAllCategory={getAllCategory}
                createCategory={createCategory}
              />
            }
          />
          <Route
            path=":id/update"
            element={
              <CategoryUpdate
                getAllCategory={getAllCategory}
                getOneCategory={getOneCategory}
                updateCategory={updateCategory}
              />
            }
          />
        </Route>
      </Route>
      <Route path="users" element={<AdminUserListPage />}>
        <Route path=":id" element={<AdminUserListPage />} />
      </Route>
    </Route> */}
    </Routes>
  );
}

export default App;

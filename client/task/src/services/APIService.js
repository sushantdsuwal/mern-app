import { get, post, put, del, patch } from './api';
import { toast } from 'react-toastify';

class APIService {
  url;
  name;
  data = [];
  success = false;

  constructor(url, name = null) {
    this.url = url;
    this.name = name;
  }
  getURL(id) {
    return Boolean(id) ? `/${this.url}/${id}` : `/${this.url}`;
  }

  async get() {
    await get({
      url: this.url,
    })
      .then((response) => {
        if (response.status < 300) {
          this.data = response.data.data;
          this.success = true;
          console.log('Toast');
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch((e) => {
        const message = !!e.message
          ? e.message
          : `Failed to fetch ${this.name}.`;
        console.log(message);
        this.name !== undefined &&
          toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
          });
      });
    return {
      data: this.data,
      success: this.success,
    };
  }

  async post(formData) {
    console.log(formData);
    await post({
      url: this.url,
      data: formData,
    })
      .then((response) => {
        if (response.status < 300) {
          toast.success(
            'Created successfully !',
            {
              position: toast.POSITION.TOP_RIGHT,
            },
            {
              autoClose: 15000,
            }
          );
          this.data = response.data;
          this.success = true;
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch((e) => {
        const message = !!e.message
          ? e.message
          : `Failed to create ${this.name}.`;
        console.log(message);
        toast.error(
          message,
          {
            position: toast.POSITION.TOP_RIGHT,
          },
          {
            autoClose: 15000,
          }
        );
      });
    return {
      data: this.data,
      success: this.success,
    };
  }

  async put(id, formData) {
    await put({
      url: this.getURL(id),
      data: formData,
    })
      .then((response) => {
        if (response.status < 300) {
          toast.success(
            'Updated successfully !',
            {
              position: toast.POSITION.TOP_RIGHT,
            },
            {
              autoClose: 15000,
            }
          );
          this.data = response.data;
          this.success = true;
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch((e) => {
        const message = !!e.message ? e.message : `${this.name} update Failed.`;
        console.log(message);

        toast.error(
          message,
          {
            position: toast.POSITION.TOP_RIGHT,
          },
          {
            autoClose: 15000,
          }
        );
      });
    return {
      data: this.data,
      success: this.success,
    };
  }

  async patch(id, formData) {
    await patch({
      url: this.getURL(id),
      data: formData,
    })
      .then((response) => {
        if (response.status < 300) {
          toast.success(
            'Updated successfully !',
            {
              position: toast.POSITION.TOP_RIGHT,
            },
            {
              autoClose: 15000,
            }
          );
          this.success = true;
          this.data = response.data;
        } else {
          return Promise.reject(response.data);
        }
      })
      .catch((e) => {
        const message = !!e.message ? e.message : `${this.name} update Failed.`;
        console.log(message);
        toast.error(
          message,
          {
            position: toast.POSITION.TOP_RIGHT,
          },
          {
            autoClose: 15000,
          }
        );
      });
    return {
      data: this.data,
      success: this.success,
    };
  }

  async delete(id) {
    if (
      window.confirm(
        `Are you sure that you want to delete selected ${this.name}?`
      )
    )
      await del(this.getURL(id))
        .then((response) => {
          if (response.status < 300) {
            toast.success(
              'Deleted successfully !',
              {
                position: toast.POSITION.TOP_RIGHT,
              },
              {
                autoClose: 15000,
              }
            );
            this.success = true;
            this.data = response.data;
          } else {
            return Promise.reject(response.data);
          }
        })
        .catch((e) => {
          const message = !!e.message
            ? e.message
            : `${this.name} delete Failed.`;
          console.log(message);

          toast.error(
            message,
            {
              position: toast.POSITION.TOP_RIGHT,
            },
            {
              autoClose: 15000,
            }
          );
        });
    return {
      data: this.data,
      success: this.success,
    };
  }
}

export default APIService;

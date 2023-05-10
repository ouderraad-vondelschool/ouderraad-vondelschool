
<!-- Place this script at the end of the body tag -->
<script>
  window.localStorage.clear();

  var form = document.getElementById("aanmeld-form");

  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);


    window.localStorage.setItem('aantal', data.get('aantal'));
    if ('on' === data.get('party')) {
      window.localStorage.setItem('party', 'on');
    } else {
      window.localStorage.setItem('party', 'off');
    }
    if ('on' === data.get('diner')) {
      window.localStorage.setItem('diner', 'on');
    } else {
      window.localStorage.setItem('diner', 'off');
    }

    if ('' === data.get('name')) {
      document.getElementById("name").focus();
    } else if ('' === data.get('email')) {
      document.getElementById("email").focus();
    } else {
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          location.href = "./confirmation.html"
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }


  }

  form.addEventListener("submit", handleSubmit);
</script>
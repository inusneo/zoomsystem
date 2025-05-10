document.addEventListener("DOMContentLoaded", () => {
  const progressItems = document.querySelectorAll(".progress_item");

  // 처음 상태바 1단계 활성화
  progressItems.forEach((item) => item.classList.remove("is-active"));
  progressItems[0].classList.add("is-active");

  const fileInput = document.getElementById("uploadFile");
  const customBtn = document.getElementById("customUploadBtn");
  const fileNameConfirmList = document.getElementById("fileNameConfirmList");
  const clearFilesBtn = document.getElementById("clearFilesBtn");
  const dropZone = document.getElementById("dropZone");

  // 선택된 파일 목록 저장용
  let selectedFiles = [];

  // 유효성 검사 함수
  function validateInput(value, regex, errorMessage) {
    if (!value || (regex && !regex.test(value))) {
      alert(errorMessage);
      return false;
    }
    return true;
  }

  // 파일 선택 버튼 클릭 시 input[type=file] 클릭
  customBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // 파일 input 변경 시 선택된 파일 목록에 추가
  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files);

    // 총 파일 개수 계산
    const totalFiles = selectedFiles.length + files.length;

    if (totalFiles > 10) {
      alert("添付ファイルは10個までアップロード可能です。");
      fileInput.value = ""; // 파일 선택 초기화
      return;
    }

    selectedFiles = selectedFiles.concat(files);
    renderFileList();
  });

  // 드래그 앤 드롭 관련 이벤트
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = "#f0f0f0";
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.style.backgroundColor = "";
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = "";
    const droppedFiles = Array.from(e.dataTransfer.files);
    selectedFiles = selectedFiles.concat(droppedFiles);
    renderFileList();
  });

  // 파일 목록 렌더링
  function renderFileList() {
    fileNameConfirmList.innerHTML = "";

    if (selectedFiles.length === 0) {
      fileNameConfirmList.innerHTML = "<span>添付ファイルなし</span>";
      return;
    }

    selectedFiles.forEach((file, index) => {
      const li = document.createElement("li");
      li.textContent = file.name;

      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = '<button type="button" id="clearFilesBtn" class="btn-outline btn-outline-delete-small">削除</button>';
      removeBtn.addEventListener("click", () => {
        selectedFiles.splice(index, 1);
        renderFileList();
      });

      li.appendChild(removeBtn);
      fileNameConfirmList.appendChild(li);
    });
  }

  // 전체 파일 목록 초기화
  clearFilesBtn.addEventListener("click", () => {
    selectedFiles = [];
    renderFileList();
  });

  // 1단계 → 2단계로 이동 (입력 확인)
  const btn = document.getElementById("goToStep2");
  if (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();

      const select = document.getElementById("selectType").value.trim();
      const kanjiLastName = document.getElementById("insertLastNamekanji").value.trim();
      const kanjiFirstName = document.getElementById("insertFirstNamekanji").value.trim();
      const furikanaLastName = document.getElementById("insertLastNamefuri").value.trim();
      const furikanaFirstName = document.getElementById("insertfirstNamefuri").value.trim();
      const email = document.getElementById("userEmail").value.trim();
      const phone = document.getElementById("userPhone").value.trim();
      const detail = document.getElementById("userDetail").value.trim();
      const school = document.getElementById("schoolName").value.trim();
      const affi = document.getElementById("affiliation").value.trim();
      const termsCheckbox = document.getElementById("userTerms");
      const fileNameConfirmList = document.getElementById("fileNameConfirmList");

      if (fileNameConfirmList) {
        fileNameConfirmList.innerHTML = "";
        if (selectedFiles.length === 0) {
          fileNameConfirmList.innerHTML = "<span>添付ファイルなし</span>";
        } else {
          selectedFiles.forEach((file) => {
            const li = document.createElement("li");
            li.textContent = file.name;
            fileNameConfirmList.appendChild(li);
          });
        }
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const nameRegex = /^[\p{Script=Hiragana}\p{Script=Han}A-Za-z]+$/u;
      const katakanaRegex = /^[\p{Script=Katakana}]+$/u;
      const phoneRegex = /^(0\d{1,2})-(\d{4})-(\d{4})$/;

      // 유효성 검사 실행
      if (!validateInput(select, null, "お問い合わせ内容を選択してください。")) return;
      if (!validateInput(kanjiFirstName, nameRegex, "姓は漢字または英語で入力してください。")) return;
      if (!validateInput(kanjiLastName, nameRegex, "名は漢字または英語で入力してください。")) return;
      if (!validateInput(furikanaLastName, katakanaRegex, "セイはカタカナで入力してください。")) return;
      if (!validateInput(furikanaFirstName, katakanaRegex, "メイはカタカナで入力してください。")) return;
      if (!validateInput(email, emailRegex, "有効なメールアドレスを入力してください。")) return;
      if (!validateInput(phone, phoneRegex, "電話番号は「03-1234-5678」または「070-1234-5678」の形式で入力してください。")) return;
      if (!validateInput(detail, null, "お問い合わせ内容の詳細を入力してください。")) return;
      if (!termsCheckbox.checked) {
        alert("個人情報の取り扱いに同意してください。");
        return;
      }

      const kanjiFullName = kanjiLastName + " " + kanjiFirstName;
      const furikanaFullName = furikanaLastName + " " + furikanaFirstName;

      // 확인 화면에 정보 출력
      document.querySelector(".input_text1").textContent = select;
      document.querySelector(".input_text2").textContent = kanjiFullName;
      document.querySelector(".input_text3").textContent = furikanaFullName;
      document.querySelector(".input_text4").textContent = school;
      document.querySelector(".input_text5").textContent = affi;
      document.querySelector(".input_text6").textContent = email;
      document.querySelector(".input_text7").textContent = phone;
      document.querySelector(".input_text8").innerHTML = fileNameConfirmList.innerHTML;
      document.querySelector(".input_text9").textContent = detail;

      // 진행상태 및 화면 변경
      progressItems.forEach((item) => item.classList.remove("is-active"));
      progressItems[1].classList.add("is-active");
      document.getElementById("step1").style.display = "none";
      document.getElementById("step2").style.display = "block";

      // 스크롤 최상단
      const target = document.querySelector("h3.title");
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  }

  // 뒤로가기 (2단계 → 1단계)
  const backBtn = document.getElementById("backToStep1");
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      progressItems.forEach((item) => item.classList.remove("is-active"));
      progressItems[0].classList.add("is-active");
      document.getElementById("step2").style.display = "none";
      document.getElementById("step1").style.display = "block";
    });
  }

  // 전화번호 입력 포맷 처리
  const phoneInput = document.getElementById("userPhone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d-]/g, "");
    });
    phoneInput.addEventListener("blur", function () {
      let phoneValue = this.value.replace(/\D/g, "");
      if (phoneValue.startsWith("03") || phoneValue.startsWith("06")) {
        this.value = phoneValue.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (phoneValue.length === 11) {
        this.value = phoneValue.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (phoneValue.length === 10) {
        this.value = phoneValue.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
      } else {
        this.value = phoneValue;
      }
    });
  }

  // 2단계 → 3단계 메일 발송
  const step3Btn = document.getElementById("goToStep3");
  if (step3Btn) {
    step3Btn.addEventListener("click", function () {
      const formData = new FormData();
      formData.append("_wpcf7", "108");
      formData.append("_wpcf7_version", "6.0.6");
      formData.append("_wpcf7_locale", "ko_KR");
      formData.append("_wpcf7_unit_tag", "wpcf7-f108-o1");
      formData.append("_wpcf7_container_post", "0");
      formData.append("_wpcf7_posted_data_hash", "");

      // 입력값 추가
      formData.append("your-name", document.getElementById("insertLastNamekanji").value + " " + document.getElementById("insertFirstNamekanji").value);
      formData.append("your-name-kana", document.getElementById("insertLastNamefuri").value + " " + document.getElementById("insertfirstNamefuri").value);
      formData.append("your-email", document.getElementById("userEmail").value);
      formData.append("your-phone", document.getElementById("userPhone").value);
      formData.append("company", document.getElementById("schoolName").value);
      formData.append("department", document.getElementById("affiliation").value);
      formData.append("your-message", document.getElementById("userDetail").value);
      formData.append("inquiry-type", document.getElementById("selectType").value);
      formData.append("your-consent", document.getElementById("userTerms").checked ? "on" : "");

      // 파일 첨부 (selectedFiles 배열 기준)
      let index = 1; // index를 1로 초기화
      if (selectedFiles.length > 0) {
        console.log(selectedFiles.length);
        for (let i = 0; i < selectedFiles.length && i < 10; i++) {
          const file = selectedFiles[i];
          formData.append("file-attachment" + index, file); // 배열 형식으로 첨부
          console.log(formData.values);
          index++; // index를 1씩 증가시킴
          console.log(formData.values);
        }
      }

      // 전송 처리
      fetch("/wp-json/contact-form-7/v1/contact-forms/108/feedback", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "mail_sent") {
            document.querySelector(".area-input-confirm").style.display = "none";
            const inputForm = document.querySelector(".area-input-form");
            if (inputForm) inputForm.style.display = "none";
            document.querySelector(".area-message").style.display = "block";

            document.querySelector(".progress > li:nth-child(2)").classList.remove("is-active");
            document.querySelector(".progress > li:nth-child(3)").classList.add("is-active");

            const target = document.querySelector("h3.title");
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          } else {
            alert("エラーが発生しました。内容を確認してください。");
          }
        })
        .catch((error) => {
          console.error("送信エラー:", error);
          alert("送信に失敗しました。再度試してください。");
        });
    });
  }
});

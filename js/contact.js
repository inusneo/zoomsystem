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

  const maxFileSize = 2 * 1024 * 1024; // 최대 파일 크기 (2MB)
  // 선택된 파일 목록 저장용
  let selectedFiles = [];

  const allowedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp", // 이미지
    "doc",
    "docx", // 워드
    "xls",
    "xlsx", // 엑셀
    "ppt",
    "pptx", // 파워포인트
    "hwp", // 한글
    "pdf", // PDF
  ];

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
    // 파일 크기 검증
    for (let file of files) {
      if (file.size > maxFileSize) {
        alert(`ファイルサイズが大きすぎます。最大ファイルサイズは 2MB です。`);
        fileInput.value = ""; // 파일 입력 초기화
        return;
      }
    }
    // 파일 확장자 검사
    for (let file of files) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        alert(`.${ext} はアップロードできません。\n\nアップロード可能なファイル形式：\n画像：jpg, jpeg, png, gif, bmp, webp\n文書：doc, docx, pdf, hwp\n表計算：xls, xlsx\nプレゼン：ppt, pptx`);
        fileInput.value = ""; // 입력 초기화
        return;
      }
    }

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
    // 파일 크기 검증
    for (let file of droppedFiles) {
      if (file.size > maxFileSize) {
        alert(`ファイルサイズが大きすぎます。最大ファイルサイズは 2MB です。`);
        fileInput.value = ""; // 파일 입력 초기화
        return;
      }
    }
    // 확장자 검사
    for (let file of droppedFiles) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        alert(`.${ext} はアップロードできません。\n\nアップロード可能なファイル形式：\n画像：jpg, jpeg, png, gif, bmp, webp\n文書：doc, docx, pdf, hwp\n表計算：xls, xlsx\nプレゼン：ppt, pptx`);
        return;
      }
    }
    // 드래그앤드롭으로 업로드할 파일이 10개 초과인지 체크
    if (selectedFiles.length + droppedFiles.length > 10) {
      alert("添付ファイルは10個までアップロード可能です。");
      return;
    }
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
      li.classList.add("file_item");
      li.textContent = file.name;

      const removeBtn = document.createElement("button");
      removeBtn.setAttribute("type", "button");
      removeBtn.className = "btn-outline btn-outline-delete-small remove-btn"; // 삭제 버튼에 적절한 클래스 추가
      removeBtn.setAttribute("data-index", index);
      removeBtn.textContent = "削除";

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
      const katakanaRegex = /^[\p{Script=Katakana}-]+$/u;
      const phoneRegex = /^\d{2,4}-\d{2,4}-\d{4}$/;

      // 유효성 검사 실행
      if (!validateInput(select, null, "お問い合わせ内容を選択してください。")) return;
      if (!validateInput(kanjiFirstName, nameRegex, "名は漢字または英語で入力してください。")) return;
      if (!validateInput(kanjiLastName, nameRegex, "姓は漢字または英語で入力してください。")) return;
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
      renderFileList();
      progressItems.forEach((item) => item.classList.remove("is-active"));
      progressItems[0].classList.add("is-active");
      document.getElementById("step2").style.display = "none";
      document.getElementById("step1").style.display = "block";
    });
  }
  // 삭제 버튼 동작 (2단계)
  fileNameConfirmList.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      selectedFiles.splice(index, 1);
      renderFileList();
    }
  });
  // 전화번호 입력 포맷 처리
  const phoneInput = document.getElementById("userPhone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d-]/g, "");
    });
    phoneInput.addEventListener("blur", function () {
      let phoneValue = this.value.replace(/\D/g, "");
         // "000-0000-0000" 형식 체크
      if (phoneValue === "00000000000"|| phoneValue ==="0000000000") {
        console.log(phoneValue)
        alert("電電話番号の入力に誤りがあります。ご確認ください。");
        this.value = ""; // 입력값 초기화
        return;
      }
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
  function showLoading() {
    document.getElementById("loadingContainer").style.display = "flex";
  }

  function hideLoading() {
    document.getElementById("loadingContainer").style.display = "none";
  }

  // 2단계 → 3단계 메일 발송
  const step3Btn = document.getElementById("goToStep3");
  if (step3Btn) {
    step3Btn.addEventListener("click", function () {
      showLoading();

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
        for (let i = 0; i < selectedFiles.length && i < 10; i++) {
          const file = selectedFiles[i];
          formData.append("file-attachment" + index, file); // 배열 형식으로 첨부
          index++; // index를 1씩 증가시킴
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
            hideLoading();
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
            hideLoading();
            alert("エラーが発生しました。内容を確認してください。");
          }
        })
        .catch((error) => {
          hideLoading();
          console.error("送信エラー:", error);
          alert("送信に失敗しました。再度試してください。");
        });
    });
  }
});

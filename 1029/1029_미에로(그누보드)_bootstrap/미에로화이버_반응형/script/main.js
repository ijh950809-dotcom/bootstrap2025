$(document).ready(function(){

  //1. 변수선언
  //메인메뉴
  let mnu = $('nav.gnb > ul > li > a');

  //2. 메인메뉴 클릭시 서브메뉴 보이게/보일때 클릭하면 숨기게
  mnu.click(function(){
    //$('.sub').hide(); //보이는 서브메뉴는 모두 숨기고
    //$(this).next().toggle(); //선택한 메인메뉴의 다음 요소 sub가 보이거나 숨기게한다.

    //선택한 a요소의 다음요소인 .sub를 나오거나 숨기게하고 부모요소의 형제요소인 li태그의 자손 .sub를 숨긴다.
    $(this).next().toggle().parent().siblings().find('.sub').hide();
  });

  //main을 클릭하면 .sub를 숨긴다
  $('main').click(function(){
    $('.sub').hide();
  });

  //갤러리 목록아래 '더보기'버튼 클릭시
  //ajax비동기 방식으로 json데이터 #list추가하기
  $('.more_btn').click(function(e){
    e.preventDefault(); //방법2. 새로고침 방지

    //alert('닫기 버튼 클릭');
    
    //return false; //방법1. 이벤트를 무력화(새로고침방지)

    //비동기 방식으로 새로고침 없이 json데이터 불러오기
    $.ajax({
      url:'data/data.json', //불러올 파일이름 지정
      type:'post', //데이터 전송 방식
      dataType:'json', //데이터 파일 형식
      success:function(result){ //위 과정이 성공이면 아래 함수 내용을 실행한다.

        var t='<ul>'; //시작태그
        $.each(result.product, function(i, e){
          //li태그가 json데이터 개수만큼 추가되어야
          t+="<li><img src='./images/"+ e.path +"' alt='"+ e.tit +"'></li>";
        });
        
        t+="</ul>";//종료태그
        $('#list').html(t);
      }
    });

    //더보기 버튼은 숨긴다.
    $(this).hide();
    $(this).css('display','none');
    $(this).slideUp();
    $(this).fadeOut();
    $(this).css('width','0');
  });
});
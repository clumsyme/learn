import React, { Component } from 'react'
import weibo from './media/weibo.png'
import douban from './media/douban.png'
import qzone from './media/qzone.png'
import logo from './media/logo.png'

class Share extends Component {
    render() {
        return (
            <a className="share" target="_blank"  title={"分享到" + this.props.siteName} href={this.props.siteUrl}>
                <img className="shareimg" alt={"分享到" + this.props.siteName} src={this.props.siteImg} width="20" height="20" />
            </a>
        )
    }
}
class Shares extends Component {
    render() {
        return(
            <div className="shares">
                <div className="showshare"></div>
                <div className="sharegroup">
                    <Share siteName="新浪微博"
                           siteUrl="http://v.t.sina.com.cn/share/share.php?title=PlaySudoku，无尽的数独谜题，从简单到超难。&url=http://playsudoku.me&source=bookmark"
                           siteImg={weibo}
                    />
                    <Share siteName="豆瓣"
                           siteUrl="http://www.douban.com/recommend/?title=PlaySudoku，无尽的数独谜题，从简单到超难。&url=http://playsudoku.me&source=bookmark"
                           siteImg={douban}
                    />
                    <Share siteName="QQ空间"
                           siteUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=PlaySudoku，无尽的数独谜题，从简单到超难。&url=http://playsudoku.me"
                           siteImg={qzone}
                    />
                </div>
            </div>
        )
    }
}
class About extends Component {
    render() {
        return(
            <div className="about">
                <div className="showabout"></div>
                <div className="aboutme">
                    <img className="aboutlogo" src={logo} alt="logo" />
                    <hr/>
                    <h2>这是什么？</h2>
                    <p>PlaySudoku 是一个完全由 JavaScript(React) 开发的数独游戏，你可以将其保存为书签，随时打开网页即可进行解谜。</p>
                    <p>网页已针对移动设备进行过优化，所以你也可以在手机/平板上进行游戏。</p>
                    <h2>一共有多少谜题？</h2>
                    <p>PlaySudoku每个难度下可以生成数以亿计的不同开局，所以永远不用担心会遇到同样的开局</p>
                    <h2>怎么玩？</h2>
                    <ol className="playhelp">
                        <li>点击空白块，再点击下方数字进行填写</li>
                        <li>直接点击下方数字，查看该数字的分布情况。</li>
                        <li>点击左方按钮显示选中方块的可能值。点击右方按钮获得选中方块的确定值（共三次机会）。</li>
                        <li>点击X按钮删除输入，点击O按钮查看答案结束解谜。</li>
                    </ol>
                    <hr/>
                    <p>PlaySudoku Designed and Developed by @LiYan。</p>
                </div>
            </div>
        )
    }
}
class Info extends Component {
    render() {
        return (
            <div className="info">
                <Shares />
                <About />
                <a className="code"  target="_blank" title="查看源代码" href="http://www.douban.com"></a>
            </div>
        )
    }
}
export default Info
